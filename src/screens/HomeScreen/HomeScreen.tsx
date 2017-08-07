import { WhiteSpace, View, Text, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { Button, ScrollView, StyleSheet, Platform } from "react-native";

import { ACTION_SET_CATALOG_DRAWER } from "../../modules/layout/constants";
import { FlatPages, Catalog } from "../../modules/layout/index";
import { TabNavigator } from "react-navigation";

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
    navigationOptions: {
      title: "React Native Shop"
    }
  }
);

export default HomeScreen;
