import { Text, View } from "antd-mobile";
import * as React from "react";
import { StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Images } from "../../product/index";
import { IImageWithColor, IProduct } from "../../product/model";
import { ICatalog } from "../model";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#bebfc1",
    borderWidth: 1,
    height: 250,
    margin: 2
  },

  imageContainer: {
    flex: 1,
    alignItems: "stretch"
  },

  image: {
    flex: 1,
    margin: 5
  },

  infoContainer: {
    padding: 5
  },

  info: {
    fontSize: 13,
    lineHeight: 15
  },

  price: {
    color: "#468847",
    fontWeight: "bold",
    fontSize: 15
  }
});

const getMinOfArray = numArray => {
  return Math.min.apply(null, numArray);
};

interface IConnectedProductProps extends IProduct {
  catalog: ICatalog;
  dispatch: Dispatch<{}>;
}

interface IProductProps extends IProduct {
  navigation: any;
}

interface IProductState {
  titleImage: IImageWithColor;
}

class Product extends React.Component<
  IConnectedProductProps & IProductProps,
  IProductState
> {
  componentWillMount() {
    const { imagesWithColor } = this.props;
    this.state = {
      titleImage:
        imagesWithColor.filter(img => img.isTitle)[0] || imagesWithColor[0]
    };
  }

  isViewed() {
    const { catalog, id } = this.props;
    return catalog.viewedProductIds.indexOf(id) !== -1;
  }

  changeTitleImage = (e, image) => {
    this.setState({ titleImage: image });
  };

  handleNavigation = (id, name) => {
    this.props.navigation.navigate("Product", { id, name });
  };

  render() {
    const {
      id,
      name,
      subProducts,
      brand,
      imagesWithColor,
      catalog,
      navigation
    } = this.props;
    const titleImage = this.state.titleImage;
    const subProduct = subProducts[0];
    const prices = subProducts.map(el => el.price);
    const isSinglePrice = prices.length === 1;
    const minPrice = getMinOfArray(prices);

    let cardPadding: number;
    let borderRadius: number;
    let width = Math.round(window.innerWidth / 2);
    if (window.innerWidth <= 640) {
      cardPadding = 10;
      borderRadius = 4;
      width -= 22;
    } else if (window.innerWidth <= 750) {
      cardPadding = 14;
      borderRadius = 6;
      width -= 28;
    } else {
      cardPadding = 15;
      borderRadius = 8;
      width -= 32;
    }

    return (
      <View style={styles.card}>
        <Images navigation={navigation} images={imagesWithColor} />
        <Ripple
          style={styles.infoContainer}
          onPress={() => this.handleNavigation(id, name)}
        >
          <Text style={styles.info}>
            {name} {brand.name} {subProduct.article}
          </Text>
          <Text
            style={styles.price}
            onPress={() => this.handleNavigation(id, name)}
          >
            {isSinglePrice ? "" : "от "}
            {parseInt(minPrice, 10)} грн
          </Text>
        </Ripple>
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog
});

export default connect<IConnectedProductProps, {}, IProductProps>(
  mapStateToProps
)(Product);
