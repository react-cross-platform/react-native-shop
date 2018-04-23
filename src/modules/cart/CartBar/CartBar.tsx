import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";

import { formatPrice } from "../utils";

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  containerTotalPrice: {
    justifyContent: "center",
    backgroundColor: "white",
    width: "50%",
    height: 40,
    borderTopColor: "lightgray",
    borderTopWidth: 1
  },

  buyCart: {
    justifyContent: "center",
    backgroundColor: "orange",
    width: "50%",
    height: 40
  },

  price: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },

  buy: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  }
});

const empty = "Нет товара";

interface IConnectedCartBarProps {
  cart: any;
}

interface ICartBarProps {}

class CartBar extends React.Component<
  IConnectedCartBarProps & ICartBarProps,
  any
> {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  add(a, b) {
    return Math.round(a) + Math.round(b);
  }

  render() {
    const { cart } = this.props;
    const productsPrice = cart.map(product => product.price * product.count);
    const totalPrice = productsPrice.reduce(this.add, 0);

    return (
      <View>
        <View style={styles.footerContainer}>
          <View style={styles.containerTotalPrice}>
            <Text style={styles.price}>Стоимость заказа</Text>
            <Text style={styles.price}>{formatPrice(totalPrice)} грн.</Text>
          </View>
          <Ripple
            style={styles.buyCart}
            onPress={() => alert("To Be Continued...")}
          >
            <Text style={styles.buy}>Оформить заказ</Text>
          </Ripple>
        </View>
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  cart: state.cart
});

export default connect<IConnectedCartBarProps, {}, ICartBarProps>(
  mapStateToProps
)(CartBar);
