import React from "react";
import { StyleSheet, View } from "react-native";

import { Cart } from "../../modules/cart/index";

const styles = StyleSheet.create({
  cartScreen: {
    flex: 1,
    backgroundColor: "white"
  }
});

interface IConnectedCartScreenProps {}

interface ICartScreenProps {
  navigation: any;
}

class CartScreen extends React.Component<
  IConnectedCartScreenProps & ICartScreenProps,
  any
> {
  static navigationOptions = () => ({
    title: "Корзина"
  });

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.cartScreen}>
        <Cart navigation={navigation} />
      </View>
    );
  }
}

export default CartScreen;
