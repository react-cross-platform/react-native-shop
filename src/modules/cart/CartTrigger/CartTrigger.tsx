import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";

import { ICartItem } from "../model";

const styles = StyleSheet.create({
  ripple: {
    paddingRight: 15,
    paddingBottom: 15
  },

  image: {
    height: 22,
    width: 22
  },

  counterContainer: {
    top: 8,
    left: 13,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "red",
    width: 15,
    height: 15,
    zIndex: 1
  },

  counter: {
    fontSize: 10,
    fontWeight: "900",
    color: "white"
  }
});
interface IConnectedCartTriggerProps {
  cart: [ICartItem];
}

interface ICartTriggerProps {
  navigation: any;
}

class CartTrigger extends React.Component<
  IConnectedCartTriggerProps & ICartTriggerProps,
  any
> {
  handleNavigation = () => {
    const { navigation } = this.props;
    navigation.navigate("Cart");
  };
  render() {
    const { cart } = this.props;
    return (
      <Ripple style={styles.ripple} onPress={this.handleNavigation}>
        {cart.length > 0
          ? <View style={styles.counterContainer}>
              <Text style={styles.counter}>
                {cart.length}
              </Text>
            </View>
          : <Text />}

        <Image
          source={require("./../../../../images/cart.png")}
          style={styles.image}
        />
      </Ripple>
    );
  }
}

const mapStateToProps: any = state => ({
  cart: state.cart
});

export default connect<IConnectedCartTriggerProps, {}, ICartTriggerProps>(
  mapStateToProps
)(CartTrigger);
