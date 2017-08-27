import React from "react";
import { gql } from "react-apollo";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import client from "../../../graphqlClient";
import { CartBar, CartItem } from "../index";
import { ICartItem } from "../model";
import { IProduct } from "../../product/model";

const styles = StyleSheet.create({
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderTopColor: "lightgray",
    borderTopWidth: 1
  }
});

interface IConnectedCartProps {
  cart: [ICartItem];
}

interface ICartProps {
  navigation: any;
}

class Cart extends React.Component<IConnectedCartProps & ICartProps, any> {
  static navigationOptions = {
    tabBarLabel: "Cart"
  };

  render() {
    const { navigation, cart } = this.props;

    const products = cart.map(el => {
      const product = client.readFragment({
        fragment: gql`
          fragment someFragment on ProductType {
            id
            name
            brand {
              name
            }
            subProducts {
              id
              article
              price
            }
            images {
              id
              src
              colorName
            }
          }
        `,
        id: `ProductType:${el.productId}`
      }) as any;
      return product as IProduct;
    });

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {products.map((product, index) =>
            <CartItem
              key={index}
              navigation={navigation}
              product={product}
              productId={cart[index].productId}
              subProductId={cart[index].subProductId}
              colorId={cart[index].colorId}
              price={cart[index].price}
              count={cart[index].count}
              index={index}
            />
          )}
        </ScrollView>
        {cart.length > 0
          ? <CartBar />
          : <View style={styles.emptyCartContainer}>
              <Image
                resizeMode="contain"
                source={{
                  uri:
                    "https://thumbs.dreamstime.com/t/smiley-%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D1%8B-emoticon-%D1%82%D0%B5%D0%BB%D0%B5%D0%B6%D0%BA%D0%B8-2986275.jpg"
                }}
                style={{ width: "80%", height: "80%" }}
              />
            </View>}
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  cart: state.cart
});

export default connect<IConnectedCartProps, {}, ICartProps>(mapStateToProps)(
  Cart
);
