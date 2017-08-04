import { HEIGHT } from "../../layout/Header/Header";
import { Text, Flex, Toast } from "antd-mobile";
import connect from "react-redux";
import * as React from "react";
import { StyleSheet, View } from "react-native";

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

  buyButton: {
    justifyContent: "center",
    backgroundColor: "orange",
    width: "50%",
    height: 40
  },

  price: {
    textAlign: "center",
    fontSize: 18
  },

  buy: {
    textAlign: "center",
    fontSize: 18
  },

  currentPrice: {},
  oldPrice: {}
});

interface IConnectedProductBuyProps {}

interface IProductBuyProps {
  price: number;
  oldPrice?: number;
}

class ProductBuy extends React.Component<
  IConnectedProductBuyProps & IProductBuyProps,
  any
> {
  render() {
    const { price, oldPrice } = this.props;
    return (
      <View style={styles.footer}>
        <View style={styles.containerPrice}>
          <Text style={styles.price}>
            {parseInt(String(price), 10)} грн
          </Text>
        </View>
        <View style={styles.buyButton}>
          <Text style={styles.buy}>Купить</Text>
        </View>
      </View>
    );
  }
}

export default ProductBuy;
