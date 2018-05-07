import { Text } from "antd-mobile";
import React from "react";
import { StyleSheet, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";
import { compose, graphql, OperationOption } from "react-apollo";
import gql from "graphql-tag";

import { ACTION_ADD_CART_ITEM } from "../../cart/constants";
import { ICartItem } from "../../cart/model";
import { formatPrice } from "../../cart/utils";
import { CART_QUERY } from "../../cart/Cart/Cart";
import client from "../../../graphqlClient";

const styles = StyleSheet.create({
  addCartItem: {
    justifyContent: "center",
    backgroundColor: "orange",
    width: "50%",
    height: 40
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
  subProductId: string;
}

interface GraphQLProps {
  submit?: () => void;
}

interface Props extends OwnProps, GraphQLProps {}

interface State {}

class AddCartItem extends React.Component<Props, State> {
  addCartItem = () => {
    const { submit } = this.props;
    submit!();
  };

  render() {
    return (
      <Ripple style={styles.addCartItem} onPress={this.addCartItem}>
        <Text style={styles.buy}>Добавить в корзину</Text>
      </Ripple>
    );
  }
}

const ADD_CART_ITEM_MUTATION = gql`
  mutation addCartItem($subProductId: Int!, $attributeValueIds: [Int]) {
    addCartItem(
      subProductId: $subProductId
      attributeValueIds: $attributeValueIds
    ) {
      cartItem {
        cart {
          id
          phone
          email
          firstName
          lastName
          city
          address
          comment
        }
        id
        price
        amount
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

const cartOptions: OperationOption<OwnProps, GraphQLProps> = {
  name: "dataCart",
  options: {
    fetchPolicy: "network-only"
  }
};

const addCartItemOptions: OperationOption<OwnProps, GraphQLProps> = {
  props: ({ ownProps, mutate }) => {
    const { subProductId, attributeValueIds } = ownProps;
    return {
      submit: () => {
        mutate!({
          variables: {
            subProductId,
            attributeValueIds
          },
          update: (client, props: any) => {
            const {
              data: {
                addCartItem: { cartItem }
              }
            } = props;
            const data: any = client.readQuery({ query: CART_QUERY });
            if (!data.cart) {
              data.cart = cartItem.cart;
              data.cart!.items = [];
            }
            delete cartItem.cart;
            data.cart!.items.push(cartItem);
            client.writeQuery({ query: CART_QUERY, data });
          }
        });
      }
    };
  }
};

export default graphql<GraphQLProps, Props>(
  ADD_CART_ITEM_MUTATION,
  addCartItemOptions
)(AddCartItem);
