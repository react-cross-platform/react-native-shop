import undefined from "antd-mobile/lib/white-space/index.web";
import { View, Text, Icon, List, WingBlank, WhiteSpace } from "antd-mobile";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ACTION_SELECT_SUBPRODUCT } from "../constants";
import { ICurrentProduct, ISubProduct } from "../model";
import { StyleSheet, Image } from "react-native";

// const styles = require("./styles.css");
const styles = StyleSheet.create({
  title: {
    color: "#1296db",
    fontSize: 18,
  },

  checkIcon: {},
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  article: {
    fontSize: 16,
  },
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
    return subProductId === this.props.product.subProductId.toString();
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
                      // style={styles.checkIcon}
                      style={{width: 20, height: 20}}
                      source={{uri: "https://s-media-cache-ak0.pinimg.com/736x/58/98/d4/5898d4333274c9ebd68988c674bb77a7--poker-night-spaniels.jpg"}}
                    />
                  : <Image style={{height: 20, width: 20}} source={{uri: "https://s-media-cache-ak0.pinimg.com/736x/e7/af/fb/e7affb6c968d30e5c325575b1b6b0e1b--best-gray-paint-gray-paint-colors.jpg"}} />
              }
              extra={
                <Text style={styles.price}>
                  {subProduct.price}
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
