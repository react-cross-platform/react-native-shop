import { Text, View, Checkbox, Flex, Icon, Tabs, WingBlank } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StyleSheet, Image } from "react-native";
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
    marginBottom: 10,
  },

  description: {
  },

  colors: {},
  colorIcon: {},
  color: {
    color: "gray",
  },

  paramName: {
    fontSize: 16,
    marginBottom: 10,
  },

  paramValue: {
    fontSize: 16,
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

    // <Text
    //   className={styles.description}
    //   dangerouslySetInnerHTML={createMarkup(dataProduct.description)}
    // />
    // <WebView 
      // source={require(dataProduct.description)}
      // source={{html: dataProduct.description.toString()}}
      // ref={'webview'}
      // automaticallyAdjustContentInsets={false}
    // />
    return (
      <View
      // className={styles.productInfo}
      >
        {/* Select SubProduct section */}
        {subProducts.length > 1
          ? <View>
              {/* <hr /> */}
              <SubProducts subProducts={subProducts} />
            </View>
          : <Text></Text>}

        {/* <hr /> */}

        {/* Select Color section */}
        <WingBlank>
          <Flex justify="between">
            <Text
              style={styles.sectionTitle}
            >
              Цвет
            </Text>

            {/*          <View className={styles.colors}>
              {images.filter(el => el.colorValue !== "").length > 1
                ? images.filter(el => el.colorValue !== "").map(
                    (e, i) =>
                      e.id === this.props.product.colorId
                        ? <Icon
                            className={styles.colorIcon}
                            key={i}
                            type={require("svg-sprite-loader!./circle-check_color.svg")}
                            style={{
                              fill: e.colorValue,
                              color: e.colorValue
                            }}
                          />
                        : <Icon
                            className={styles.colorIcon}
                            key={i}
                            onClick={() => this.changeColor(e.id)}
                            type={require("svg-sprite-loader!./icon-circle-for-colors.svg")}
                            style={{
                              fill: e.colorValue,
                              color: e.colorValue
                            }}
                          />
                  )
                : images.filter(el => el.colorValue !== "").map((e, i) =>
                    <Icon
                      className={styles.tabIcon}
                      key={i}
                      type={require("svg-sprite-loader!./check-circle.svg")}
                      style={{
                        fill: e.colorValue,
                        color: e.colorValue
                      }}
                    />
                  )}
            </View> */}

            <Text
              style={styles.color}
            >
              {activeImage.colorName}
            </Text>
          </Flex>
        </WingBlank>

        <Hr />

        {/* Product params section */}
        <WingBlank>
          <Text
            style={styles.sectionTitle}
          >
            Характеристики
          </Text>
          {attributes.map((el, index) =>
            <Flex key={index} justify="between">
              <Flex>
                <Text style={styles.paramName}>
                  {el.name}
                </Text>
              </Flex>
              <Flex>
                <Text style={styles.paramValue}>{el.values.map(v => v.name).join(", ")}</Text>
              </Flex>
            </Flex>
          )}

          {/* Product description section */}
          {subProducts.length === 1
            ? subProducts.map((supProduct, i) =>
                <Flex key={i} justify="between">
                  <Text
                   style={styles.paramName}
                  >
                    Размер, ШxВxГ
                  </Text>
                  <View className={styles.paramValue}>
                    <Text>
                      {supProduct.attributes.length !== 0
                        ? <Text>
                            {supProduct.attributes
                              .slice(0, 3)
                              .map(e => e.values.map(v => v.value))
                              .join("x")
                            }
                          </Text>
                        : <Text>{supProduct.article}</Text>}
                    </Text>
                  </View>
                </Flex>
              )
            : <Text></Text>}
        </WingBlank>

        <Hr />

        {/* Product description section */}
        <WingBlank>
          <Text style={styles.sectionTitle}>О товаре</Text>
          <Text>
            {dataProduct.description}
          </Text>

        </WingBlank>
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
