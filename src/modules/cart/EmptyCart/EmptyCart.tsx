import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  emptyCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderTopColor: "lightgray",
    borderTopWidth: 1
  },
  
  emptyCartText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30
  }
});

class EmptyCart extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.emptyCartContainer}>
        <Image
          source={require("../../../../images/sad-smile.png")}
          style={{
            resizeMode: "contain"
          }}
        />
        <Text style={styles.emptyCartText}>Корзина Пуста</Text>
      </View>
    );
  }
}

export default EmptyCart;
