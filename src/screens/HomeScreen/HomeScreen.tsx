import { WhiteSpace } from "antd-mobile";
import { View, Text, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet } from "react-native";

import { ACTION_SET_CATALOG_DRAWER } from "../../modules/layout/constants";
import { Catalog, FlatPages } from "../../modules/layout/index";

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  homePage: {}
});

class HomeScreen extends React.Component<any, any> {
  componentWillMount() {
    this.props.dispatch({
      type: ACTION_SET_CATALOG_DRAWER,
      openCatalog: false
    });
  }

  render() {
    return (
      <View>
        <WingBlank size="sm">
          <Catalog />
        </WingBlank>
        <WhiteSpace size="lg" />
        <FlatPages />
      </View>
    );
  }
}

const mapStateToProps: any = state => ({});

export default connect<any, any, any>(mapStateToProps)(HomeScreen);
