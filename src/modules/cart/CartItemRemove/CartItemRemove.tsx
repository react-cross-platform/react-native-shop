import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ACTION_REMOVE_CART_ITEM } from "../constants";

const styles = StyleSheet.create({
  container: {
    width: "10%"
  },

  removeIcon: {
    width: 20,
    height: 20
  }
});

interface IConnectedCartItemRemoveProps {
  dispatch: Dispatch<{}>;
}

interface ICartItemRemoveProps {
  index: number;
}

class CartItemRemove extends React.Component<
  IConnectedCartItemRemoveProps & ICartItemRemoveProps,
  any
> {
  removeCartItem(index) {
    this.props.dispatch({ type: ACTION_REMOVE_CART_ITEM, index });
  }

  render() {
    const { index } = this.props;
    return (
      <View style={styles.container}>
        <Ripple onPress={() => this.removeCartItem(index)}>
          <Image
            style={styles.removeIcon}
            source={require("../../../../images/trash-icon.png")}
          />
        </Ripple>
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  cart: state.cart
});

export default connect<IConnectedCartItemRemoveProps, {}, ICartItemRemoveProps>(
  mapStateToProps
)(CartItemRemove);
