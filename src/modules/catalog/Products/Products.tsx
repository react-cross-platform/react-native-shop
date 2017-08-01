import { Flex, View, WingBlank } from "antd-mobile";
import update from "immutability-helper";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { IData } from "../../../model";
import { Loading } from "../../layout/index";
import { Product } from "../index";
import { IAllProduct, ICatalog } from "../model";

// import MasonryInfiniteScroller from "react-masonry-infinite";
// const ALL_PRODUCTS_QUERY = require("./allProducts.gql");
const ALL_PRODUCTS_QUERY = `
  query allProducts($categoryId: Int, $offset: Int, $first: Int) {
    allProducts(categoryId: $categoryId, offset: $offset, first: $first) {
      total
      products {
        id
        name
        shortDescription
        brand {
          id
          name
        }
        category {
          id
          name
        }
        imagesWithColor {
          id
          src
          width
          height
          colorName
          colorValue
          isTitle
        }
        subProducts {
          id
          article
          price
          oldPrice
          discount
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  products: {
    marginTop: 3,
    marginLeft: 3,
    marginBottom: 5
  },
  loading: {
    margin: 50
  }
});

const LIMIT = 10;

interface IDataProducts extends IData {
  allProducts: IAllProduct;
}

interface IConnectedProductsProps {
  catalog: ICatalog;
  data: IDataProducts;
}

interface IProductsProps {
  categoryId: string;
  navigation: any;
}

interface IProductsState {
  // haveMoreProducts?: boolean;
  // scrolledProducts?: number;
}

const options = {
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      categoryId: props.categoryId,
      first: LIMIT,
      offset: 0
    }
  })
};

class Products extends React.Component<
  IConnectedProductsProps & IProductsProps,
  IProductsState
> {
  // state = {
  //   haveMoreProducts: true,
  //   scrolledProducts: 0
  // };

  _keyExtractor = (item, index) => index;

  render() {
    const { navigation, data } = this.props;
    const { loading, allProducts, fetchMore, networkStatus, refetch } = data;

    if (data.networkStatus === 1) {
      return <ActivityIndicator style={styles.loading} />;
    }

    const { products, total } = allProducts;
    const filteredProducts = products.filter(item => !!item.subProducts);
    return (
      <View style={styles.products}>
        <FlatList
          data={filteredProducts}
          refreshing={networkStatus === 4}
          onRefresh={() => refetch()}
          onEndReachedThreshold={0.5}
          keyExtractor={this._keyExtractor}
          horizontal={false}
          numColumns={2}
          onEndReached={() => {
            fetchMore({
              variables: { offset: allProducts.products.length },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult.allProducts) {
                  return prev;
                }
                return update(prev, {
                  allProducts: {
                    products: {
                      $push: fetchMoreResult.allProducts.products
                    }
                  }
                });
              }
            });
          }}
          renderItem={({ item }) => {
            const { navigation } = this.props;
            return <Product {...item} navigation={navigation} />;
          }}
        />
      </View>
    );
  }
}

const mapStateToProps: any = state => ({});

export default compose<any, any, any>(
  connect<IConnectedProductsProps, {}, IProductsProps>(mapStateToProps),
  graphql(gql(ALL_PRODUCTS_QUERY), options as any)
)(Products as any);
