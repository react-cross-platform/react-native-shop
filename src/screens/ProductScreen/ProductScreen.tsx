import React from "react";

import { Product } from "../../modules/product/index";

interface IProductScreenProps {
  navigation: any;
}

class ProductScreen extends React.Component<IProductScreenProps, null> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`
  });
  render() {
    const { navigation } = this.props;
    return (
      <Product
        navigation={navigation}
        id={navigation.state.params.id}
        isModal={false}
      />
    );
  }
}

export default ProductScreen;
