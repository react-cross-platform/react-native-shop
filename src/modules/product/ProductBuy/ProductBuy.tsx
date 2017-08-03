import { HEIGHT } from '../../layout/Header/Header';
import { Text, Flex, Toast } from "antd-mobile";
import connect from "react-redux";
import * as React from 'react';
import { StyleSheet, View } from "react-native";

// const styles = require("./styles.css");
const styles = StyleSheet.create({

  buyPrice: {
    justifyContent: 'center',
    backgroundColor: "blue",
    width: "50%",
    height: 40,
  },

  buyButton: {
    justifyContent: 'center',
    backgroundColor: "gray",
    width: "50%",
    height: 40,
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
      <View 
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={styles.buyPrice}>
          <Text style={styles.price}>
            {parseInt(String(price), 10)} грн
          </Text>
        </View>
        <View style={styles.buyButton}>
          <Text style={styles.buy}>
            Купить
          </Text>
        </View>
      </View>
    );
  }
}

export default (ProductBuy);
