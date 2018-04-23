import React from "react";
import { Image, StyleSheet } from "react-native";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Modal } from "antd-mobile";

import RippleWithTimeout from "../../../utils/RippleWithTimeout";
import client from "../../../graphqlClient";
import { CART_QUERY } from "./Cart";

const styles = StyleSheet.create({
  container: {
    width: "10%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center"
  },

  removeIcon: {
    width: 20,
    height: 20
  }
});

interface IConnectedCartItemRemoveProps {}
interface ICartItemRemoveProps {
  product: any;
  submit: any;
}

interface Props extends IConnectedCartItemRemoveProps, ICartItemRemoveProps {}
interface State {}

class RemoveCartItem extends React.Component<Props, State> {
  removeCartItem = () => {
    const {
      submit,
      product: { id }
    } = this.props;
    Modal.alert("Удалить из корзины?", "", [
      { text: "Нет", onPress: () => null },
      { text: "Да", onPress: () => submit(id) }
    ]);
  };

  render() {
    return (
      <RippleWithTimeout
        style={styles.container}
        rippleCentered={true}
        rippleSize={35}
        timeOut={200}
        onPress={this.removeCartItem}
      >
        <Image
          style={styles.removeIcon}
          source={require("../../../../images/trash-icon.png")}
        />
      </RippleWithTimeout>
    );
  }
}

const REMOVE_CART_ITEM_MUTATION = gql`
  mutation removeCartItem($id: Int!) {
    removeCartItem(id: $id) {
      totalPrice
    }
  }
`;

const options: any = {
  props: ({ ownProps, mutate }) => {
    return {
      submit: id => {
        return mutate!({
          variables: { id },
          update: (client, props: any) => {
            const data = client.readQuery({ query: CART_QUERY }) as any;
            if (data.cart) {
              data.cart.items = data.cart.items.filter(item => item.id !== id);
            }
            client.writeQuery({ query: CART_QUERY, data });
          }
        });
      }
    };
  }
};

export default graphql<any, any>(REMOVE_CART_ITEM_MUTATION, options)(
  RemoveCartItem
);
