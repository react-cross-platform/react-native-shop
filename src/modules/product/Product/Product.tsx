import { Flex, Text } from "antd-mobile";
import gql from "graphql-tag";
import React from "react";
import { compose, graphql } from "react-apollo";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Images, ProductBuy, ProductInfo } from "..";
import { IData } from "../../../model";
import { Hr, Loading } from "../../layout";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { ICurrentProduct, IProduct, ISubProduct } from "../model";
import { CART_QUERY } from "../../cart/Cart/Cart";

const PRODUCT_QUERY = gql`
  query product($id: Int) {
    product(id: $id) {
      id
      name
      shortDescription
      description
      brand {
        id
        name
      }
      category {
        id
        name
      }
      images(size: MD, withColorOnly: false) {
        id
        src
        width
        height
        isTitle
        attributeValue {
          id
          name
          value
        }
      }
      subProducts {
        id
        article
        price
        oldPrice
        discount
        attributes {
          name
          values {
            id
            name
            value
            description
          }
        }
      }
      attributes {
        id
        name
        values {
          name
          description
        }
      }
    }
  }
`;

const styles = StyleSheet.create({
  product: {
    backgroundColor: "white",
    flex: 1
  },

  productMainScreen: {
    alignContent: "center"
  },

  header: {
    height: 40,
    backgroundColor: "skyblue"
  },

  infoTitle: {
    fontSize: 20,
    lineHeight: 22,
    height: 45,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center"
  },

  productTop: {
    backgroundColor: "blue",
    height: 40
  },

  categoryName: {
    textAlign: "center"
  }
});

interface IDataProduct extends IData {
  product: IProduct;
}

interface IConnectedProductProps {
  data: IDataProduct;
  product: ICurrentProduct;
  dispatch: Dispatch<{}>;
}

interface IProductProps {
  id: string;
  isModal: boolean;
  navigation: any;
}

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

const getActiveSubProduct = (subProducts, subProductId): ISubProduct => {
  return subProducts.filter(sp => sp.id === subProductId)[0] || subProducts[0];
};

class Product extends React.Component<
  IConnectedProductProps & IProductProps,
  any
> {
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const { loading, product } = data;
    if (loading === false) {
      const { subProducts, images } = product;
      const colorId = images[0].attributeValue.id;
      const { subProductId } = nextProps.product;
      const subProductIds = subProducts.map(sp => sp.id);
      const subProductColorIds = product.images
        .filter(attribute => attribute.attributeValue !== null)
        .map(color => color.attributeValue.id);
      if (subProductIds.indexOf(subProductId) === -1) {
        this.props.dispatch({
          type: ACTION_SELECT_SUBPRODUCT,
          colorId: subProductColorIds[0],
          subProductId: subProductIds[0]
        });
      }
    }
  }

  render() {
    const { data, navigation } = this.props;
    const { loading, product } = data;
    const { subProductId, colorId } = this.props.product;

    if (loading === true) {
      return <Loading />;
    }

    const { brand, images, subProducts } = product;
    const activeSubProduct = getActiveSubProduct(subProducts, subProductId);
    const image = images[0];
    const { price, oldPrice } = activeSubProduct;

    return (
      <View style={styles.product}>
        <ScrollView>
          <Images navigation={navigation} images={images} />
          <Flex
            justify="around"
            direction="column"
            style={styles.productMainScreen}
          >
            <Text style={styles.infoTitle}>
              {product.name} {product.brand.name} {"\n"}{" "}
              {activeSubProduct.article}
            </Text>
          </Flex>
          <Hr />
          <ProductInfo
            dataProduct={product}
            activeSubProduct={activeSubProduct}
          />
        </ScrollView>
        <ProductBuy
          price={price}
          navigation={navigation}
          attributeValueIds={colorId}
          subProductId={subProductId}
          colorId={this.props.product.colorId}
        />
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product
});

export default compose<any, any, any>(
  connect<IConnectedProductProps, {}, IProductProps>(mapStateToProps),
  graphql(PRODUCT_QUERY, options)
)(Product as any);
