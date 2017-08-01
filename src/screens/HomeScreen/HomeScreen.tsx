import { WhiteSpace } from "antd-mobile";
import { View, Text, WingBlank } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet } from "react-native";

import { ACTION_SET_CATALOG_DRAWER } from "../../modules/layout/constants";
import { Catalog, FlatPages } from "../../modules/layout/index";

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  homePage: {
    margin: 4
  }
});

interface IHomeScreenProps {
  navigation: any;
}

class HomeScreen extends React.Component<IHomeScreenProps, null> {
  static navigationOptions = {
    title: "React Native Shop"
  };
  render() {
    const { navigation } = this.props;
    return (
      <ScrollView >
        <View style={styles.homePage}>
          <Catalog navigation={navigation} />
          {/*
            <WhiteSpace size="lg" />
            <FlatPages navigation={navigation} />
          */}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps: any = state => ({});

export default connect<any, any, any>(mapStateToProps)(HomeScreen);
