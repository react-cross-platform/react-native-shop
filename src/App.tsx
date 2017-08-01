import React, { Component } from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { ApolloProvider } from "react-apollo";
import store from "./store";
import client from "./graphqlClient";
import { Catalog, Layout } from "./modules/layout/index";
import { HomeScreen, CategoryScreen, ProductScreen } from "./screens/index";
import { StackNavigator } from "react-navigation";

interface Props {}

interface State {}

const style = StyleSheet.create({
  body: {
    backgroundColor: "lightgrey",
    flex: 1
  }
});

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Category: { screen: CategoryScreen },
  Product: { screen: ProductScreen }
}) as any;

export default class App extends Component<Props, State> {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <NavigationApp />
      </ApolloProvider>
    );
  }
}
