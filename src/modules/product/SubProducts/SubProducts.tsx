import { List, Text, View, WingBlank } from "antd-mobile";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { formatPrice } from "../../cart/utils";
import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { ICurrentProduct, ISubProduct } from "../model";

const styles = StyleSheet.create({
  title: {
    color: "#1296db",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10
  },
  checkIcon: {
    width: 20,
    height: 20
  },
  unCheckIcon: {
    width: 20,
    height: 20
  },
  article: {
    fontSize: 16,
    marginLeft: 10
  },
  subProductPrice: {
    fontSize: 16,
    fontWeight: "bold"
  }
});

const Item = List.Item;
const Brief = Item.Brief;

interface IConnectedSubProductsProps {
  dispatch: Dispatch<{}>;
  product: ICurrentProduct;
  selectSubProduct: any;
}

interface ISubProductsProps {
  subProducts: [ISubProduct];
}

class SubProducts extends React.Component<
  IConnectedSubProductsProps & ISubProductsProps,
  any
> {
  onSelect = subProductId => {
    const { product: colorId, selectSubProduct } = this.props;
    selectSubProduct(colorId, subProductId);
  };

  isActive = subProductId => {
    return subProductId === this.props.product.subProductId;
  };

  render() {
    const { subProducts } = this.props;
    const { subProductId } = this.props.product;

    return (
      <View>
        <WingBlank>
          <Text style={styles.title}>Модификации</Text>
        </WingBlank>
        <List>
          {subProducts.map((subProduct, index) => (
            <Item
              key={index}
              onClick={() => this.onSelect(subProduct.id)}
              thumb={
                this.isActive(subProduct.id) ? (
                  <Image
                    style={styles.checkIcon}
                    source={require("../../../../images/circle-check.png")}
                  />
                ) : (
                  <Image
                    style={styles.unCheckIcon}
                    source={require("../../../../images/circle.png")}
                  />
                )
              }
              extra={
                <Text
                  style={[
                    styles.subProductPrice,
                    { color: this.isActive(subProduct.id) ? "orange" : "gray" }
                  ]}
                >
                  {formatPrice(subProduct.price) + " грн."}
                </Text>
              }
            >
              <Text style={styles.article}>{subProduct.article}</Text>
            </Item>
          ))}
        </List>
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product
});

const mapDispatchToProps: any = dispatch => ({
  selectSubProduct: (colorId, subProductId) => {
    dispatch({
      type: ACTION_SELECT_SUBPRODUCT,
      colorId,
      subProductId
    });
  }
});

export default connect<IConnectedSubProductsProps, {}, ISubProductsProps>(
  mapStateToProps,
  mapDispatchToProps
)(SubProducts);
