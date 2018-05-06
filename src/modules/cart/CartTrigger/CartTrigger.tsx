import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { ICartItem } from "../model";
import { isEmpty } from "../Cart/Cart";

const styles = StyleSheet.create({
  commonContainer: {
    height: "100%",
    width: "120%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 22
  },

  counterContainer: {
    top: 2,
    left: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "red",
    width: 15,
    height: 15,
    zIndex: 1
  },

  counter: {
    fontSize: 10,
    fontWeight: "900",
    color: "white"
  },

  image: {
    bottom: 6,
    height: 25,
    width: 25
  }
});
interface IConnectedCartTriggerProps {
  data: any;
}

interface ICartTriggerProps {
  navigation: any;
}

class CartTrigger extends React.Component<
  IConnectedCartTriggerProps & ICartTriggerProps,
  any
> {
  handleNavigation = () => {
    const { navigation } = this.props;
    navigation.navigate("Cart");
  };

  render() {
    const {
      data: { loading, cart }
    } = this.props;

    if (loading) {
      return null;
    }

    const cartIsEmpty = isEmpty(cart);

    return (
      <Ripple
        rippleCentered={true}
        rippleSize={50}
        style={styles.commonContainer}
        onPress={this.handleNavigation}
      >
        {!cartIsEmpty && (
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>{cart.items.length}</Text>
          </View>
        )}

        <Image
          source={require("./../../../../images/cart.png")}
          style={styles.image}
        />
      </Ripple>
    );
  }
}

const CART_QUERY = gql`
  query cart {
    cart {
      id
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

export default graphql<any, any>(CART_QUERY)(CartTrigger);
