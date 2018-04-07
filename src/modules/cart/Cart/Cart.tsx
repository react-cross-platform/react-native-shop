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
import { prettyPrice } from "../utils";

import { Loading } from "../../../modules/layout/index";
import client from "../../../graphqlClient";
import { CartBar } from "../index";
import { ICartItem } from "../model";
import { IProduct } from "../../product/model";
import CartItem from "./CartItem";

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

const reducerForSumm = (accumulator, currentValue) =>
  accumulator + currentValue;

class Cart extends React.Component<IConnectedCartProps & ICartProps, any> {
  render() {
    const { navigation, dataCart: { loading, cart } } = this.props;
    const totalPrice =
      cart.items.length > 0 && cart.items.map(item => item.price);

    const totalCartPrice = totalPrice.length
      ? totalPrice.reduce(reducerForSumm)
      : "0";

    if (loading) {
      return <Loading />;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: cart.items.length ? "#ebebef" : "#ffffff"
        }}
      >
        {cart.items.length ? (
          <ScrollView>
            <Text style={styles.totalCost}>{`Итого к оплате: ${prettyPrice(
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
          <View style={styles.emptyCartContainer}>
            <Image
              source={require("../../../../images/sad-smile.png")}
              style={{
                resizeMode: "contain"
              }}
            />
            <Text style={styles.emptyCartText}>Корзина Пуста</Text>
          </View>
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
