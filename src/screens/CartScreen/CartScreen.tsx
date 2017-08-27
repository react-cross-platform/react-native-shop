import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Cart } from '../../modules/cart/index';

const styles = StyleSheet.create({});

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
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Cart navigation={navigation} />
      </View>
    );
  }
}

export default CartScreen;
