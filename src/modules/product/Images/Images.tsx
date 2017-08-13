import { Carousel, Flex } from "antd-mobile";
import React from "react";
import { Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import Ripple from "react-native-material-ripple";

import { IImage } from "../model";

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: "white"
  },
  flex: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "white"
  },
  image: {
    flex: 1,
    alignSelf: "center",
    height: "90%"
  }
});

interface IImagesProps {
  navigation: any;
  images: [IImage];
  productId?: string;
  productName?: string;
}

interface IImagesState {}

class Images extends React.Component<IImagesProps, IImagesState> {
  private isProductScreen = () => {
    const { navigation } = this.props;
    return navigation.state.routeName == "Product";
  };

  render() {
    const { images } = this.props;
    let carouselHeight;
    let padding;

    let { height } = Dimensions.get("window");

    if (this.isProductScreen()) {
      height = height - 173;
      padding = 10;
    } else {
      height = 200;
      padding = 5;
    }

    if (images.length > 1) {
      return (
        <Carousel
          autoplay={false}
          style={[styles.carousel, { height: height - 8 }]}
          dots={images.length > 1}
          infinite={false}
          selectedIndex={0}
          dotStyle={{ top: 5 }}
        >
          {images.map((image, i) =>
            <Flex
              key={i}
              justify="center"
              align="center"
              style={[
                styles.flex,
                {
                  marginLeft: padding,
                  marginRight: padding,
                  paddingBottom: 20
                }
              ]}
            >
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{ uri: image.src }}
              />
            </Flex>
          )}
        </Carousel>
      );
    } else {
      const image = images[0];
      return (
        <Flex
          justify="center"
          align="center"
          style={[
            styles.flex,
            {
              marginLeft: padding,
              marginRight: padding
            }
          ]}
        >
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{ uri: image.src }}
          />
        </Flex>
      );
    }
  }
}

export default Images;
