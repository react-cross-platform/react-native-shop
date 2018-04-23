import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text,
  WebView
} from "react-native";
import { connect } from "react-redux";
import { formatPrice } from "../utils";

import { Loading } from "../../../modules/layout/index";
import client from "../../../graphqlClient";
import { CartBar } from "../index";
import { ICartItem } from "../model";
import { IProduct } from "../../product/model";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const styles = StyleSheet.create({
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderTopColor: "lightgray",
    borderTopWidth: 1
  },

  totalCost: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "900",
    alignSelf: "center"
  },
  cartItems: {
    borderBottomWidth: 4.5,
    borderColor: "#d6d7da"
  },
  emptyCartText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30
  }
});

interface IConnectedCartProps {
  cart: [ICartItem];
  dataCart: any;
  loadint: boolean;
}

interface ICartProps {
  navigation: any;
}

class Cart extends React.Component<IConnectedCartProps & ICartProps, any> {
  isEmpty = cart => {
    if (!cart || cart.items.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      navigation,
      dataCart: { loading, cart }
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    const cartIsEmpty = this.isEmpty(cart);
    const totalPrice = !cartIsEmpty && cart.items.map(item => item.price);
    const totalCartPrice =
      !cartIsEmpty &&
      totalPrice.reduce((sum, currentValue) => sum + currentValue);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: cartIsEmpty ? "#ffffff" : "#ebebef"
        }}
      >
        {!cartIsEmpty ? (
          <ScrollView>
            <Text style={styles.totalCost}>{`Итого к оплате: ${formatPrice(
              totalCartPrice
            )} грн`}</Text>
            <View style={styles.cartItems}>
              {cart.items.map((product, index) => (
                <CartItem
                  key={index}
                  navigation={navigation}
                  product={product}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <EmptyCart />
        )}
      </View>
    );
  }
}

const options: any = {
  name: "dataCart",
  options: {
    fetchPolicy: "network-only"
  }
};

export const CART_QUERY = gql`
  query cart {
    cart {
      id
      totalPrice
      phone
      email
      firstName
      lastName
      city
      address
      comment
      items {
        id
        amount
        price
        attributeValues {
          id
          name
          value
        }
        subProduct {
          id
          article
          price
          oldPrice
          product {
            id
            name
            brand {
              id
              name
            }
            images(size: SM, withColorOnly: true) {
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
          }
        }
      }
    }
  }
`;

export default graphql<any, any>(CART_QUERY, options)(Cart);
