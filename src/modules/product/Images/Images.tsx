import { Carousel, Flex } from "antd-mobile";
import * as React from "react";
import { IImage } from "../model";
import { StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: "center",
    height: 475
  },

  carousel: {
    backgroundColor: "white"
  },
});

interface IImagesProps {
  images: [IImage];
}

interface IImagesState {
  initialHeight: any;
}

class Images extends React.Component<IImagesProps, IImagesState> {
  state = {
    initialHeight: 200
  };

  render() {
    const { images } = this.props;

    const dotStyle = {
      position: "relative",
    };
    if (images.length > 1) {
      return (
        <Carousel
          autoplay={false}
          style={styles.carousel}
          dots={images.length > 1}
          infinite={false}
          selectedIndex={0}
        >
          {this.props.images.map((image, i) =>
            <Flex
              key={i}
              justify="center"
              align="center"
              style={{
                flex: 1,
                alignItems: "stretch"
              }}
            >
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{ uri: image.src }}
                onLoad={() => {
                  window.dispatchEvent(new Event("resize"));
                  this.setState({
                    initialHeight: null
                  });
                }}
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
          style={{
            flex: 1,
            alignItems: "stretch",
            backgroundColor: "white"
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
