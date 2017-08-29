import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import RippleWithTimeout from "../../../utils/RippleWithTimeout";
import { ACTION_REMOVE_CART_ITEM } from "../constants";

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
      <RippleWithTimeout
        style={styles.container}
        rippleCentered={true}
        rippleSize={35}
        timeOut={200}
        onPress={() => this.removeCartItem(index)}
      >
        <Image
          style={styles.removeIcon}
          source={require("../../../../images/trash-icon.png")}
        />
      </RippleWithTimeout>
    );
  }
}

const mapStateToProps: any = state => ({
  cart: state.cart
});

export default connect<IConnectedCartItemRemoveProps, {}, ICartItemRemoveProps>(
  mapStateToProps
)(CartItemRemove);
