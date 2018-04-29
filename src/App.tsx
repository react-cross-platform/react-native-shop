import React from "react";
import { ApolloProvider } from "react-apollo";
import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import client from "src/graphqlClient";
import { CartScreen, CategoryScreen, FlatPageScreen, HomeScreen, ProductScreen } from "src/screens";
import store from "src/store";

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
  FlatPage: { screen: FlatPageScreen },
  Cart: { screen: CartScreen }
}) as any;

export default class App extends React.Component<IAppProps, IAppState> {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <NavigationApp />
        </ApolloProvider>
      </Provider>
    );
  }
}
