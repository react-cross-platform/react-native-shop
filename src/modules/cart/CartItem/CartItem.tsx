import { IProduct } from "../../product/model";
import { Stepper, WhiteSpace, WingBlank } from "antd-mobile";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Hr } from "../../layout/index";
import { ACTION_SET_COUNT } from "../constants";
import { ICartItem } from "../model";
import { prettyPrice } from "../utils";
import { CartItemRemove } from "../index";

const styles = StyleSheet.create({
  mainContainer: {
    height: 150
  },

  cartContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
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
    width: "80%",
    height: "80%"
  },

  info: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "55%"
  },

  infoTitle: {
    fontWeight: "bold"
  },

  infoColor: {
    color: "black"
  },

  infoStepper: {
    height: 35,
    width: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
  dispatch: Dispatch<{}>;
  cart: ICartItem;
}

interface ICartItemProps {
  navigation: any;
  product: IProduct;
  productId: string;
  subProductId: string;
  colorId: number;
  price: number;
  count: number;
  index: number;
}

class CartItem extends React.Component<
  IConnectedCartItemProps & ICartItemProps,
  any
> {
  handleNavigation = (navigation, id, name) => {
    navigation.navigate("Product", { id, name });
  };

  onChange = value => {
    this.props.dispatch({
      type: ACTION_SET_COUNT,
      subProductId: this.props.subProductId,
      count: value
    });
  };

  priceMultiple = (price, count) => {
    return price * count;
  };

  render() {
    const {
      product,
      navigation,
      productId,
      subProductId,
      colorId,
      price,
      count,
      index
    } = this.props;
    const totalPrice = this.priceMultiple(price, count);
    return (
      <WingBlank size="lg">
        <WhiteSpace size="sm" />
        <View style={styles.mainContainer}>
          <View style={styles.cartContent}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: product.images[0].src }}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.infoTitle}>
                {product.name} {product.brand.name}
              </Text>
              <Text style={styles.infoArticle}>
                артикул:{" "}
                {product.subProducts
                  .filter(e => e.id === subProductId)
                  .map(el => el.article)}
              </Text>
              <Text style={styles.infoColor}>
                цвет:{" "}
                {product.images
                  .filter(e => e.id === colorId)
                  .map(el => el.colorName)}
              </Text>
              <View style={styles.infoStepper}>
                <Text>Кол-во: </Text>
                <Stepper
                  max={10}
                  min={1}
                  defaultValue={count}
                  onChange={this.onChange}
                />
              </View>
              <Text style={styles.infoPriceContainer}>
                Цена: {prettyPrice(Math.round(totalPrice))} грн.
              </Text>
            </View>

            <CartItemRemove index={index} />
          </View>
        </View>
        <Hr />
      </WingBlank>
    );
  }
}

const mapStateToProps: any = state => ({
  cart: state.cart
});

export default connect<IConnectedCartItemProps, {}, ICartItemProps>(
  mapStateToProps
)(CartItem);
