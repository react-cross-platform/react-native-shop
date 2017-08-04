import { Text, View, Checkbox, Flex, Icon, Tabs, WingBlank } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  StyleSheet,
  Image,
  WebView,
  Alert,
  TouchableHighlight
} from "react-native";
import { Hr } from "../../layout/index";

import { ACTION_SELECT_COLOR } from "../constants";
import { SubProducts } from "../index";
import { ICurrentProduct, IProduct, ISubProduct } from "../model";

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  productInfo: {},
  sectionTitle: {
    color: "#1296db",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },

  description: {},
  colors: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  colorIcon: {},
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
    height: 250
  }
});

const { TabPane } = Tabs;
const { AgreeItem, CheckboxItem } = Checkbox;

interface IConnectedProductInfoProps {
  product: ICurrentProduct;
  dispatch: Dispatch<{}>;
}

interface IProductInfoProps {
  dataProduct: IProduct;
  activeSubProduct: ISubProduct;
}

const options = {
  options: props => ({
    variables: {
      id: props.id
    }
  })
};

function createMarkup(html) {
  return { __html: html };
}

class ProductInfo extends React.Component<
  IConnectedProductInfoProps & IProductInfoProps,
  any
> {
  changeColor = colorId => {
    this.props.dispatch({ type: ACTION_SELECT_COLOR, colorId });
  };

  render() {
    const { dataProduct, product, activeSubProduct, dispatch } = this.props;
    const { brand, images, subProducts, attributes } = dataProduct;
    const { subProductId, colorId } = this.props.product;
    const activeImage =
      activeSubProduct.id === subProductId
        ? images.filter(image => image.id === colorId)[0]
        : images.filter(image => image.isTitle === true)[0];

    return (
      <View>
        {/* Select SubProduct section */}
        {subProducts.length > 1
          ? <View>
              <SubProducts subProducts={subProducts} />
            </View>
          : <Text />}

        {/* Select Color section */}
        <WingBlank>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View style={{ width: "20%" }}>
              <Text style={styles.sectionTitle}>Цвет</Text>
            </View>
            <View style={styles.colors}>
              {images.filter(el => el.colorValue !== "").length > 1
                ? images.filter(el => el.colorValue !== "").map(
                    (e, i) =>
                      e.id === this.props.product.colorId
                        ? <View
                            key={i}
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: e.colorValue,
                              height: 20,
                              width: 20,
                              borderRadius: 10,
                              margin: 5
                            }}
                          >
                            <Image
                              source={require("../../../../images/checked.png")}
                              style={{
                                height: 15,
                                width: 15
                              }}
                            />
                          </View>
                        : <TouchableHighlight
                            key={i}
                            onPress={() => this.changeColor(e.id)}
                          >
                            <View
                              style={{
                                backgroundColor: e.colorValue,
                                height: 20,
                                width: 20,
                                borderRadius: 10,
                                margin: 5
                              }}
                            />
                          </TouchableHighlight>
                  )
                : images.filter(el => el.colorValue !== "").map((e, i) =>
                    <View
                      key={i}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: e.colorValue,
                        height: 20,
                        width: 20,
                        borderRadius: 10
                      }}
                    >
                      <Image
                        source={require("../../../../images/checked.png")}
                        style={{
                          height: 15,
                          width: 15
                        }}
                      />
                    </View>
                  )}
            </View>

            <View
              style={{
                width: "25%",
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
              <Text style={styles.colorName}>
                {activeImage.colorName}
              </Text>
            </View>
          </View>
        </WingBlank>

        <Hr />

        {/* Product params section */}
        <WingBlank>
          <Text style={styles.sectionTitle}>Характеристики</Text>
          {attributes.map((el, index) =>
            <Flex key={index} justify="between">
              <Flex>
                <Text style={styles.paramName}>
                  {el.name}
                </Text>
              </Flex>
              <Flex>
                <Text style={styles.paramValue}>
                  {el.values.map(v => v.name).join(", ")}
                </Text>
              </Flex>
            </Flex>
          )}

          {/* Product description section */}
          {subProducts.length === 1
            ? subProducts.map((supProduct, i) =>
                <Flex key={i} justify="between">
                  <Text style={styles.paramName}>Размер, ШxВxГ</Text>
                  <View className={styles.paramValue}>
                    <Text>
                      {supProduct.attributes.length !== 0
                        ? <Text>
                            {supProduct.attributes
                              .slice(0, 3)
                              .map(e => e.values.map(v => v.value))
                              .join("x")}
                          </Text>
                        : <Text>
                            {supProduct.article}
                          </Text>}
                    </Text>
                  </View>
                </Flex>
              )
            : <Text />}
        </WingBlank>

        <Hr />

        {/* Product description section */}
        <WingBlank>
          <Text style={styles.sectionTitle}>О товаре</Text>
        </WingBlank>
        <WebView
          source={{ html: dataProduct.description }}
          ref={"webview"}
          // automaticallyAdjustContentInsets={false}
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
