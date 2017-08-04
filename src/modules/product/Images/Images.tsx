import { Carousel, Flex } from "antd-mobile";
import * as React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

import { IImage } from "../model";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: "center",
    height: "90%"
  }
});

interface IImagesProps {
  navigation: any;
  images: [IImage];
}

interface IImagesState {}

class Images extends React.Component<IImagesProps, IImagesState> {
  render() {
    const { images, navigation } = this.props;

    let height;
    let carouselHeight;
    let margin;
    if (navigation.state.routeName == "Product") {
      height = 475;
      carouselHeight = height;
      margin = 10;
    } else {
      height = 250;
      carouselHeight = height * 0.75;
      margin = 5;
    }

    const dotStyle = {
      position: "relative"
    };
    if (images.length > 1) {
      return (
        <ScrollView style={{ height }}>
          <Carousel
            autoplay={false}
            style={{
              backgroundColor: "white",
              height: carouselHeight
            }}
            dots={images.length > 1}
            infinite={false}
            selectedIndex={0}
            dotStyle={{ top: 12 }}
          >
            {images.map((image, i) =>
              <Flex
                key={i}
                justify="center"
                align="center"
                style={{
                  flex: 1,
                  alignItems: "stretch",
                  marginLeft: margin,
                  marginRight: margin
                }}
              >
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={{ uri: image.src }}
                />
              </Flex>
            )}
          </Carousel>
        </ScrollView>
      );
    } else {
      const image = images[0];
      return (
        <Flex
          justify="center"
          align="center"
          style={{
            flex: 1,
            alignItems: "stretch",
            backgroundColor: "white",
            marginLeft: margin,
            marginRight: margin
          }}
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
