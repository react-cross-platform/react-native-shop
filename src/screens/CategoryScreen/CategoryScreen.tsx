import React from "react";
import { StyleSheet } from "react-native";

import { IData } from "../../model";
import { Products } from "../../modules/catalog/index";
import { CartTrigger } from "../../modules/cart/index";

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
    title: `${navigation.state.params.name}`,
    headerRight: <CartTrigger navigation={navigation} />
  });

  render() {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    return <Products categoryId={id} navigation={navigation} />;
  }
}

export default CategoryScreen;
