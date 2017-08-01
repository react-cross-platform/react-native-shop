import { View, Text, Flex, Toast } from "antd-mobile";
import * as React from "react";
import { StyleSheet } from "react-native";

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  buy: {},

  buyPrice: {
    backgroundColor: "blue",
    textAlign: "center",
    width: "100%",
    height: 40,
    fontSize: 18,
  },

  buyButton: {
    backgroundColor: "gray",
    textAlign: "center",
    width: "100%",
    height: 40,
    fontSize: 18,
  },

  price: {},
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
    // debugger;
    return (
      <Flex>
        <Flex.Item>
          <Text style={styles.buyPrice}>
            {parseInt(String(price), 10)} грн
          </Text>
        </Flex.Item>
        <Flex.Item >
          <Text style={styles.buyButton}>
            Купить
          </Text>
        </Flex.Item>
      </Flex>
    );
  }
}

export default ProductBuy;
