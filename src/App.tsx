import React from "react";
import { ApolloProvider } from "react-apollo";
import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";

import client from "./graphqlClient";
import {
  CategoryScreen,
  FlatPageScreen,
  HomeScreen,
  ProductScreen
} from "./screens/index";
import store from "./store";

interface IAppProps {}

interface IAppState {}

const style = StyleSheet.create({
  body: {
    backgroundColor: "lightgrey",
    flex: 1
  }
});

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Category: { screen: CategoryScreen },
  Product: { screen: ProductScreen },
  FlatPage: { screen: FlatPageScreen }
}) as any;

export default class App extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <NavigationApp />
      </ApolloProvider>
    );
  }
}
