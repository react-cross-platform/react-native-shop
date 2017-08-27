import { View } from "antd-mobile";
import update from "immutability-helper";
import React from "react";
import { compose, gql, graphql } from "react-apollo";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { IData } from "../../../model";
import { Loading } from "../../layout/index";
import { Product } from "../index";
import { IAllProduct, ICatalog } from "../model";

const ALL_PRODUCTS_QUERY = `
  query allProducts($ids: [Int], $categoryId: Int, $offset: Int, $first: Int) {
    allProducts(ids: $ids, categoryId: $categoryId, offset: $offset, first: $first) {
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
        images {
          id
          src
          width
          height
          colorValue
          colorName
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
    margin: 2
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

interface IProductsState {}

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
  _keyExtractor = (item, index) => index;

  filterProducts = products => {
    return products.filter(item => item.subProducts[0] !== undefined);
  };

  renderFooter = () => {
    return <Loading />;
  };

  render() {
    const { navigation, data } = this.props;
    const { loading, allProducts, fetchMore, networkStatus, refetch } = data;

    if (networkStatus === 1) {
      return <Loading />;
    }

    const { products, total } = allProducts;
    return (
      <View style={styles.products}>
        <FlatList
          data={this.filterProducts(products)}
          refreshing={networkStatus === 4}
          onRefresh={() => refetch()}
          onEndReachedThreshold={0.5}
          keyExtractor={this._keyExtractor}
          horizontal={false}
          numColumns={2}
          ListFooterComponent={this.renderFooter}
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
                      $push: this.filterProducts(
                        fetchMoreResult.allProducts.products
                      )
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
