import { List, Text, View, WingBlank } from "antd-mobile";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { prettyPrice } from "../../cart/utils";
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
  article: {
    fontSize: 16,
    marginLeft: 10
  }
});

const Item = List.Item;
const Brief = Item.Brief;

interface IConnectedSubProductsProps {
  dispatch: Dispatch<{}>;
  product: ICurrentProduct;
}

interface ISubProductsProps {
  subProducts: [ISubProduct];
}

class SubProducts extends React.Component<
  IConnectedSubProductsProps & ISubProductsProps,
  any
> {
  onChangePrice = elId => {
    this.props.dispatch({
      colorId: this.props.product.colorId,
      subProductId: elId,
      type: ACTION_SELECT_SUBPRODUCT
    });
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
          {subProducts.map((subProduct, index) =>
            <Item
              key={index}
              onClick={() => this.onChangePrice(subProduct.id)}
              thumb={
                this.isActive(subProduct.id)
                  ? <Image
                      style={styles.checkIcon}
                      source={require("../../../../images/circle-check.png")}
                    />
                  : <Image
                      style={{ height: 20, width: 20 }}
                      source={require("../../../../images/circle.png")}
                    />
              }
              extra={
                <Text
                  style={{
                    color: this.isActive(subProduct.id) ? "orange" : "gray",
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  {prettyPrice(subProduct.price) + " грн."}
                </Text>
              }
            >
              <Text style={styles.article}>
                {subProduct.article}
              </Text>
            </Item>
          )}
        </List>
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  product: state.product
});

export default connect<IConnectedSubProductsProps, {}, ISubProductsProps>(
  mapStateToProps
)(SubProducts);
