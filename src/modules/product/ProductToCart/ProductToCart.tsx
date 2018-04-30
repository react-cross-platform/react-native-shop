import React from "react";
import { Text } from "antd-mobile";
import { StyleSheet, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";
import { graphql, OperationOption } from "react-apollo";
import gql from "graphql-tag";

import { ACTION_ADD_CART_ITEM } from "../../cart/constants";
import { ICartItem } from "../../cart/model";
import { formatPrice } from "../../cart/utils";
import { CART_QUERY } from "../../cart/Cart/Cart";
import { AddCartItem } from "../../cart/index";
import client from "../../../graphqlClient";

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  containerPrice: {
    justifyContent: "center",
    backgroundColor: "white",
    width: "50%",
    height: 40,
    borderTopColor: "lightgray",
    borderTopWidth: 1
  },

  addCartItem: {
    justifyContent: "center",
    backgroundColor: "orange",
    width: "50%",
    height: 40
  },

  openCart: {
    justifyContent: "center",
    backgroundColor: "#15c544",

    width: "50%",
    height: 40
  },

  price: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },

  buy: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  }
});

// interface IConnectedProductBuyProps {
//   dispatch: any;
//   cart: [ICartItem];
//   product: any;
// }

// interface IProductBuyProps {
//   price: string;
//   oldPrice?: string;
//   subProductId: string;
//   colorId: string;
//   navigation: any;
//   productId: string;
// }

interface OwnProps {
  attributeValueIds?: any;
  price: any;
  colorId: any;
  navigation: any;
  subProductId: string;
}

interface GraphQLProps {}
interface Props extends OwnProps, GraphQLProps {}

interface State {}

class ProductToCart extends React.Component<Props, State> {
  openCart = () => {
    const { navigation } = this.props;
    navigation.navigate("Cart");
  };

  render() {
    const { price, subProductId, attributeValueIds } = this.props;
    const totalPrice = parseInt(String(price), 10);
    const cartData = client.readQuery({ query: CART_QUERY }) as any;
    const inCart = cartData.cart
      ? cartData.cart.items.filter(item => item.subProduct.id === subProductId)
          .length > 0
      : false;

    return (
      <View style={styles.footer}>
        <View style={styles.containerPrice}>
          <Text style={styles.price}>{formatPrice(totalPrice)} грн.</Text>
        </View>
        {inCart ? (
          <Ripple style={styles.openCart} onPress={this.openCart}>
            <Text style={styles.buy}>Перейти в корзину</Text>
          </Ripple>
        ) : (
          <AddCartItem
            subProductId={subProductId}
            attributeValueIds={attributeValueIds}
          />
        )}
      </View>
    );
  }
}

const cartOptions: OperationOption<OwnProps, GraphQLProps> = {
  name: "dataCart",
  options: {
    fetchPolicy: "network-only"
  }
};

export default graphql<GraphQLProps, Props>(CART_QUERY, cartOptions)(
  ProductToCart
);
