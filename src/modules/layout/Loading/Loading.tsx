import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loading: {
    margin: 15
  }
});

const Loading = () => {
  return <ActivityIndicator size="large" style={styles.loading} />;
};

export default Loading;
