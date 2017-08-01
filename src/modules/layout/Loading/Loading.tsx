import { View, Text, Button, Icon, List, WingBlank } from "antd-mobile";
import * as React from "react";
import { StyleSheet } from "react-native";

// const styles = require("./styles.css");
const styles = StyleSheet.create({ loading: {} });

const Loading = () => {
  return <Text>Loading...</Text>;
  // return (
  //   <View className={styles.loading}>
  //     <Icon type="loading" size="lg" />
  //   </View>
  // );
};

export default Loading;
