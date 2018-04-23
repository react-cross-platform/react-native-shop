import { Checkbox, Flex, Tabs, Text, View, WingBlank } from "antd-mobile";
import React from "react";
import { compose } from "react-apollo";
import { Image, StyleSheet, TouchableHighlight, WebView } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ACTION_SELECT_COLOR } from "../constants";
import { SubProducts } from "../index";
import { ICurrentProduct, IProduct, ISubProduct } from "../model";
import { Hr } from "../../layout/index";

const styles = StyleSheet.create({
  title: {
    color: "#1296db",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15
  },

  colorSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  circle: {
    height: 15,
    width: 15
  },

  checkedCircle: {
    height: 15,
    width: 15
  },

  description: {},

  colors: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  colorIcon: {},

  containerColorName: {
    width: "26%",
    alignItems: "flex-end",
    justifyContent: "center"
  },

  colorName: {
    alignItems: "center",
    color: "gray"
  },

  paramName: {
    fontSize: 16,
    marginBottom: 10
  },

  paramValue: {
    fontSize: 16
  },

  info: {
    height: 250,
    top: -10,
    marginLeft: 10,
    marginRight: 10
  }
});

const { TabPane } = Tabs;
const { AgreeItem, CheckboxItem } = Checkbox;

interface IConnectedProductInfoProps {
  product: ICurrentProduct;
  dispatch: Dispatch<{}>;
}

interface IProductInfoProps {
  dataProduct: any;
  activeSubProduct: ISubProduct;
}

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

interface Props extends IConnectedProductInfoProps, IProductInfoProps {}
interface State {}

class ProductInfo extends React.Component<Props, State> {
  changeColor = colorId => {
    this.props.dispatch({ type: ACTION_SELECT_COLOR, colorId });
  };

  render() {
    const { dataProduct, activeSubProduct, dispatch } = this.props;

    const { brand, images, subProducts, attributes } = dataProduct;
    const { subProductId, colorId } = this.props.product;
    const imagesWithColors = images.filter(
      image => image.attributeValue !== null
    );
    const activeColor = imagesWithColors.map(
      color => color.attributeValue.id === colorId[0]
    );

    return (
      <View>
        {/* Select SubProduct section */}
        <SubProducts subProducts={subProducts} />

        {/* Select Color section */}
        <WingBlank>
          <View style={styles.colorSection}>
            <View style={{ width: "20%" }}>
              <Text style={styles.title}>Цвет</Text>
            </View>
            <View style={styles.colors}>
              {images.filter(image => image.attributeValue !== null).length > 1
                ? images.filter(image => image.attributeValue !== null).map(
                    (color, i) =>
                      color.attributeValue.id === colorId[0] ? (
                        <View
                          key={i}
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: color.attributeValue.value,
                            height: 20,
                            width: 20,
                            borderRadius: 10,
                            margin: 5
                          }}
                        >
                          <Image
                            source={require("../../../../images/checked.png")}
                            style={styles.checkedCircle}
                          />
                        </View>
                      ) : (
                        <TouchableHighlight
                          key={i}
                          onPress={() =>
                            this.changeColor(color.attributeValue.id)
                          }
                        >
                          <View
                            style={{
                              backgroundColor: color.attributeValue.value,
                              height: 20,
                              width: 20,
                              borderRadius: 10,
                              margin: 5
                            }}
                          />
                        </TouchableHighlight>
                      )
                  )
                : images
                    .filter(image => image.attributeValue !== null)
                    .map((color, i) => (
                      <View
                        key={i}
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: color.attributeValue.value,
                          height: 20,
                          width: 20,
                          borderRadius: 10
                        }}
                      >
                        <Image
                          source={require("../../../../images/checked.png")}
                          style={styles.checkedCircle}
                        />
                      </View>
                    ))}
            </View>

            <View style={styles.containerColorName}>
              <Text style={styles.colorName}>
                {/* {activeImage.colorName} */}
              </Text>
            </View>
          </View>
        </WingBlank>

        <Hr />

        {/* Product params section */}
        <WingBlank>
          <Text style={styles.title}>Характеристики</Text>
          {attributes.map((el, index) => (
            <Flex key={index} justify="between">
              <Flex>
                <Text style={styles.paramName}>{el.name}</Text>
              </Flex>
              <Flex>
                <Text style={styles.paramValue}>
                  {el.values.map(v => v.name).join(", ")}
                </Text>
              </Flex>
            </Flex>
          ))}

          {/* Product description section */}
          {subProducts.length === 1 ? (
            subProducts.map((subProduct, i) => (
              <Flex key={i} justify="between">
                <Text style={styles.paramName}>Размер, ШxВxГ</Text>
                <View className={styles.paramValue}>
                  <Text>
                    {subProduct.attributes.length > 0 ? (
                      <Text>
                        {subProduct.attributes
                          .slice(0, 3)
                          .map(e => e.values.map(v => v.value))
                          .join("x")}
                      </Text>
                    ) : (
                      <Text>{subProduct.article}</Text>
                    )}
                  </Text>
                </View>
              </Flex>
            ))
          ) : (
            <Text />
          )}
        </WingBlank>

        <Hr />

        {/* Product description section */}
        <WingBlank>
          <Text style={styles.title}>О товаре</Text>
        </WingBlank>
        <WebView
          source={{ html: dataProduct.description }}
          ref={"webview"}
          scrollEnabled={true}
          style={styles.info}
        />
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product
});

export default compose(
  connect<IConnectedProductInfoProps, {}, IProductInfoProps>(mapStateToProps)
)(ProductInfo);
