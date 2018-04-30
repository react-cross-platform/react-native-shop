import { Text, View } from "antd-mobile";
import React from "react";
import { StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Images } from "../../product/index";
import { IImageWithColor, IProduct } from "../../product/model";
import { ICatalog } from "../model";
import { formatPrice } from "../../cart/utils";

// FIXME: fix via TS config
declare const Math;

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
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 8
  },

  info: {
    fontSize: 13,
    lineHeight: 15,
    maxHeight: 30
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
  titleImage: any;
}

const handleNavigation = (navigation, id, name) => {
  navigation.navigate("Product", { id, name });
};

const Wrapper = props => {
  // FixMe: This is temporary hack solution
  const { withNavigation, navigation, id, name, children } = props;
  return withNavigation ? (
    <Ripple
      onPress={() => handleNavigation(navigation, id, name)}
      style={styles.card}
    >
      {children}
    </Ripple>
  ) : (
    <View style={styles.card}>{children}</View>
  );
};

class Product extends React.Component<
  IConnectedProductProps & IProductProps,
  IProductState
> {
  constructor(props) {
    super(props);
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
    const productPrice = Math.floor(minPrice);
    const isSingleImage = imagesWithColor.length == 1;

    return (
      <Wrapper
        withNavigation={imagesWithColor.length == 1}
        navigation={navigation}
        id={id}
        name={name}
      >
        <Images navigation={navigation} images={imagesWithColor} />
        <Ripple
          style={styles.infoContainer}
          onPress={() => handleNavigation(navigation, id, name)}
        >
          <Text style={styles.info}>
            {name} {brand.name} {subProduct.article}
          </Text>
          <Text
            style={styles.price}
            onPress={() => handleNavigation(navigation, id, name)}
          >
            {isSinglePrice ? "" : "от "}
            {formatPrice(productPrice)} грн.
          </Text>
        </Ripple>
      </Wrapper>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog
});

export default connect<IConnectedProductProps, {}, IProductProps>(
  mapStateToProps
)(Product);
