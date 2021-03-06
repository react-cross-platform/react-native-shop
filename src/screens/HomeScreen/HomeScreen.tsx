import { WhiteSpace, View, Text, WingBlank } from "antd-mobile";
import React from "react";
import { connect } from "react-redux";
import { Button, ScrollView, StyleSheet, Platform } from "react-native";

import { ACTION_SET_CATALOG_DRAWER } from "../../modules/layout/constants";
import { FlatPages, Catalog } from "../../modules/layout/index";
import { TabNavigator } from "react-navigation";
import { CartTrigger } from "../../modules/cart/index";

const HomeScreen = TabNavigator(
  {
    Catalog: { screen: Catalog },
    FlatPages: { screen: FlatPages }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "#037aff" : "#fff",
      labelStyle: {
        fontSize: 12
      }
    },
    navigationOptions: props => ({
      title: "React Native Shop",
      headerRight: <CartTrigger navigation={(props as any).navigation} />
    })
  } as any
);

export default HomeScreen;
