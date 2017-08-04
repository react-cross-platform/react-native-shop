import { Flex, Text, View } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { Image, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ICatalog } from "../../catalog/model";
import { ICategory } from "../../product/model";
import { ILayout } from "../model";

const styles = StyleSheet.create({
  flexItem: {},
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#bebfc1",
    borderWidth: 1,
    height: 140,
    margin: 2
  },
  image: {
    width: "60%",
    height: "60%"
  },
  name: {
    fontSize: 16,
    margin: 5,
    textAlign: "center"
  }
});

interface IConnectedSubCatalogProps {
  catalog: ICatalog;
  layout: ILayout;
  dispatch: Dispatch<{}>;
}

interface ISubCatalogProps {
  navigation: any;
  categories: [ICategory];
}

function chunk(arr, len = 1) {
  const chunks: any = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

class SubCatalog extends React.Component<
  IConnectedSubCatalogProps & ISubCatalogProps,
  any
> {
  handleNavigation = (id, name) => {
    this.props.navigation.navigate("Category", { id, name });
  };

  isViewed(id) {
    const { catalog, categories } = this.props;
    return catalog.viewedCategoryIds.indexOf(id) !== -1;
  }

  render() {
    const { dispatch, categories } = this.props;
    return (
      <View>
        {chunk(categories, 2).map((cats, i) =>
          <Flex justify="center" key={i} wrap="wrap">
            {cats.map((cat, index) =>
              <Ripple
                key={index}
                onPress={() => this.handleNavigation(cat.id, cat.name)}
                style={styles.card}
              >
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={{ uri: cat.image.src }}
                />
                <Text style={styles.name}>
                  {cat.name}
                </Text>
              </Ripple>
            )}
          </Flex>
        )}
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog,
  layout: state.layout
});

export default compose(
  connect<IConnectedSubCatalogProps, {}, ISubCatalogProps>(mapStateToProps)
)(SubCatalog);
