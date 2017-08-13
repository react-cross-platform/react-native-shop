import { WingBlank } from "antd-mobile";
import React from "react";
import { compose, gql, graphql } from "react-apollo";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { IData } from "../../../model";
import { SubCatalog } from "../../layout/index";
import { ICategory } from "../../product/model";
import { ILayout } from "../model";

const CATEGORIES_QUERY = `
  query categories {
    categories {
      id
      name
      alias
      parent {
        id
        name
      }
      image {
        id
        src
        width
        height
      }
    }
  }
`;

interface ICatalogData extends IData {
  categories: [ICategory];
}

interface IConnectedCatalogProps {
  data: ICatalogData;
  dispatch: Dispatch<{}>;
  layout: ILayout;
}

interface ICatalogProps {
  navigation: any;
}

const styles = StyleSheet.create({
  categoryName: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    margin: 20
  },
  icon: {
    width: 26,
    height: 26
  }
});

class Catalog extends React.Component<
  IConnectedCatalogProps & ICatalogProps,
  null
> {
  static navigationOptions = {
    tabBarLabel: "КАТАЛОГ",
    tabBarIcon: ({ tintColor }) =>
      <Image
        source={require("../../../../images/catalog.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
  };

  render() {
    const { data, navigation } = this.props;
    if (!data || data.loading) {
      return <View />;
    }
    if (data.errors) {
      console.log(data.errors);
    }

    const { loading, categories } = data;
    const startCats: ICategory[] = [];
    const childrenMap = {};
    for (const cat of categories) {
      if (cat.parent) {
        const key = cat.parent.id;
        if (!(key in childrenMap)) {
          childrenMap[key] = [];
        }
        childrenMap[key].push(cat);
      } else {
        startCats.push(cat);
      }
    }

    return (
      <WingBlank size="sm">
        <ScrollView>
          {startCats.map((parent, i) =>
            <View key={i}>
              <Text style={styles.categoryName}>
                {parent.name}
              </Text>
              <SubCatalog
                key={i}
                categories={childrenMap[parent.id]}
                navigation={navigation}
              />
            </View>
          )}
        </ScrollView>
      </WingBlank>
    );
  }
}

export default graphql<any, any, any>(gql(CATEGORIES_QUERY))(Catalog as any);
