import { View, Text, Flex, Icon, WhiteSpace } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-native";
import { Dispatch } from "redux";
import { StyleSheet, Image } from "react-native";

// import { scaleImageSize } from "../../product/index";
import { IImageWithColor, IProduct } from "../../product/model";
import { ICatalog } from "../model";

// const styles = require("./styles.css");
const maxImageHeight = 180;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "#bebfc1",
    borderWidth: 1,
    height: 250,
    width: "48%",
    margin: 3
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
    margin: 5
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

interface IProductProps extends IProduct {}

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

  render() {
    const {
      id,
      name,
      subProducts,
      brand,
      imagesWithColor,
      catalog
    } = this.props;
    const titleImage = this.state.titleImage;
    const subProduct = subProducts[0];
    const url = `/product/${id}`;
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

    // const maxImageHeight = Math.max(
    //   ...imagesWithColor.map(
    //     img => scaleImageSize(img.width, img.height).height
    //   )
    // );

    const linkParams = {
      to: {
        pathname: url,
        state: { modal: true }
      }
    };

    const height = window.innerHeight * 0.73;

    return (
      <View style={styles.card}>
        {/*         {this.isViewed()
          ? <div style={{ position: "absolute", top: 3, left: 10 }}>
              <Icon
                type={require("!svg-sprite-loader!./viewed.svg")}
                size="sm"
                style={{ fill: "orange" }}
              />
            </div>
          : ""} */}

        <Flex style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: titleImage.src }}
          />
        </Flex>

        {/* Images */}

        {/*
          {imagesWithColor.length > 1
          ? <Flex justify="center">
              {imagesWithColor.map((image, i) =>
                <Icon
                  key={i}
                  type={require("!svg-sprite-loader!./dot.svg")}
                  size={image.id === titleImage.id ? "lg" : "md"}
                  style={{
                    fill: image.colorValue
                  }}
                  onClick={e => this.changeTitleImage(e, image)}
                />
              )}
            </Flex>
          : ""}
        */}

        <View style={styles.infoContainer}>
          <Link to={`/product/${id}`}>
            <Text style={styles.info}>
              {name} {brand.name} {subProduct.article}
            </Text>
          </Link>
          <Text style={styles.price}>
            {isSinglePrice ? "" : "от "}
            {parseInt(minPrice, 10)} грн
          </Text>
        </View>
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
