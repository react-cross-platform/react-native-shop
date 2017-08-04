import { ILayout } from "../../modules/layout/model";
import { ICategory } from "../../modules/product/model";
import { IData } from "../../model";
import * as React from "react";
import { compose, gql, graphql } from "react-apollo";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { Dispatch } from "redux";
import { View, Text } from "antd-mobile";
import { Loading } from "../../modules/layout/index";
import { Products } from "../../modules/catalog/index";

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  category: {},
  categoryName: {}
});

interface IDataCategory extends IData {}

interface IConnectedCategoryProps {}

interface ICategoryProps {
  id: string;
  navigation: any;
}

class CategoryScreen extends React.Component<
  IConnectedCategoryProps & ICategoryProps,
  null
> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`
  });

  render() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    return <Products categoryId={id} navigation={navigation} />;
  }
}

export default CategoryScreen;
