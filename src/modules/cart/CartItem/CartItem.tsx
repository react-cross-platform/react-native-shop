import React from "react";
import { WhiteSpace, WingBlank } from "antd-mobile";
import { Image, StyleSheet, Text, View } from "react-native";
import { Hr } from "../../layout/index";
import { formatPrice } from "../utils";
import RemoveCartItem from '../RemoveCartItem/RemoveCartItem'

import { ICartItem } from "../model";

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
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 25,
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10
  },

  checkedIcon: {
    width: 20,
    height: 20 
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

interface Props extends IConnectedCartItemProps, ICartItemProps {}
interface State {}

class CartItem extends React.Component<Props, State> {
  // handleNavigation = (navigation, id, name) => {
  //   navigation.navigate("Product", { id, name });
  // };

  render() {
    const {
      product: {
        amount,
        attributeValues,
        subProduct: {
          article,
          price,
          product: { brand, name, images }
        }
      },
      navigation
    } = this.props;
    const color = attributeValues[0].value;

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

            <View style={[styles.infoColor, { backgroundColor: color }]}>
              <Image
                style={styles.checkedIcon}
                source={require("../../../../images/checked.png")}
              />
            </View>

            <Text style={styles.infoPriceContainer}>
              Цена: {formatPrice(Math.round(price))} грн.
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
