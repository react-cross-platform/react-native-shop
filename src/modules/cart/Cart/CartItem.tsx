import React from "react";
import { Stepper, WhiteSpace, WingBlank } from "antd-mobile";
import { Image, StyleSheet, Text, View } from "react-native";
import { Hr } from "../../layout/index";
import { prettyPrice } from "../utils";
import RemoveCartItem from "./RemoveCartItem";

import { ICartItem } from "../model";

export const getCartItemTotalPrice = (price: number, amount: number) => {
  return price * amount;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    height: 150,
    backgroundColor: "white"
  },

  cartContent: {
    flex: 1,
    flexDirection: "row"
  },

  imageContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 90,
    marginTop: 8,
    width: "35%"
  },

  image: {
    width: "100%",
    height: "100%"
  },

  info: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "55%"
  },

  infoTitle: {
    fontWeight: "bold",
    fontSize: 18
  },

  infoColor: {
    color: "black"
  },

  infoStepper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },

  infoPriceContainer: {
    fontWeight: "bold"
  },

  infoPrice: {
    fontSize: 18,
    color: "green"
  },

  infoArticle: {
    color: "gray"
  }
});

interface IConnectedCartItemProps {
  // dispatch: Dispatch<{}>;
  // cart: ICartItem;
}

interface ICartItemProps {
  key: number;
  navigation: any;
  product: ICartItem;
}

class CartItem extends React.Component<
  IConnectedCartItemProps & ICartItemProps,
  any
> {
  constructor() {
    super();
    this.state = {
      language: "java"
    };
  }
  // handleNavigation = (navigation, id, name) => {
  //   navigation.navigate("Product", { id, name });
  // };

  onChange = value => {
    const { amount, subProduct: { price } } = this.props.product;
    getCartItemTotalPrice(price, amount);
  };

  render() {
    const {
      product: {
        amount,
        attributeValues,
        subProduct: { article, price, product: { brand, name, images } }
      },
      navigation
    } = this.props;

    const color =
      attributeValues.length > 0 ? attributeValues[0].value : undefined;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.cartContent}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: images[0].src }}
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>{name}</Text>

            <Text style={styles.infoTitle}>
              {brand.name} {article}
            </Text>

            <View style={styles.infoStepper}>
              <Stepper
                max={10}
                min={1}
                defaultValue={amount}
                onChange={this.onChange}
                style={{ width: "50%", flex: 0 }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: color,
                  height: 25,
                  width: 25,
                  borderRadius: 15,
                  marginLeft: 5
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../../../../images/checked.png")}
                />
              </View>
            </View>
            <Text style={styles.infoPriceContainer}>
              Цена: {prettyPrice(Math.round(price))} грн.
            </Text>
          </View>

          <RemoveCartItem product={this.props.product} />
        </View>
        <Hr />
      </View>
    );
  }
}

export default CartItem;
