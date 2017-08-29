import { Text } from "antd-mobile";
import React from "react";
import { StyleSheet, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";

import { ACTION_ADD_CART_ITEM } from "../../cart/constants";
import { ICartItem } from "../../cart/model";
import { prettyPrice } from "../../cart/utils";

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

  putCart: {
    justifyContent: "center",
    backgroundColor: "orange",
    width: "50%",
    height: 40
  },

  toCart: {
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

interface IConnectedProductBuyProps {
  dispatch: any;
  cart: [ICartItem];
  product: any;
}

interface IProductBuyProps {
  price: string;
  oldPrice?: string;
  subProductId: string;
  colorId: string;
  navigation: any;
  productId: string;
}

class ProductBuy extends React.Component<
  IConnectedProductBuyProps & IProductBuyProps,
  any
> {
  putToCart(productId, subProductId, colorId, price) {
    this.props.dispatch({
      type: ACTION_ADD_CART_ITEM,
      productId,
      subProductId,
      colorId,
      price
    });
  }

  handleNavigation = () => {
    const { navigation } = this.props;
    navigation.navigate("Cart");
  };

  render() {
    const {
      price,
      oldPrice,
      productId,
      subProductId,
      colorId,
      cart
    } = this.props;
    const totalPrice = parseInt(String(price), 10);

    const inCart =
      cart.filter(el => el.subProductId === subProductId).length > 0;
    return (
      <View style={styles.footer}>
        <View style={styles.containerPrice}>
          <Text style={styles.price}>
            {prettyPrice(totalPrice)} грн.
          </Text>
        </View>
        {inCart
          ? <Ripple style={styles.toCart} onPress={this.handleNavigation}>
              <Text style={styles.buy}>Перейти в корзину</Text>
            </Ripple>
          : <Ripple
              style={styles.putCart}
              onPress={() =>
                this.putToCart(productId, subProductId, colorId, price)}
            >
              <Text style={styles.buy}>Добавить в корзину</Text>
            </Ripple>}
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  cart: state.cart
});

export default connect<IConnectedProductBuyProps, {}, IProductBuyProps>(
  mapStateToProps
)(ProductBuy);
