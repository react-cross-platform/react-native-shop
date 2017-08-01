import * as React from "react";
import { compose, graphql, gql } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { WingBlank } from "antd-mobile";

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
// const styles = require("./styles.css");

interface ICatalogData extends IData {
  categories: [ICategory];
}

interface IConnectedCatalogProps {
  data: ICatalogData;
  dispatch: Dispatch<{}>;
  layout: ILayout;
}

interface ICatalogProps {
  isDrawer: boolean;
  navigation: any;
}

const styles = StyleSheet.create({
  categoryName: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    margin: 20
  },
  mainScreen: {
    backgroundColor: "#f5f5f9"
  }
});

class Catalog extends React.Component<
  IConnectedCatalogProps & ICatalogProps,
  null
> {
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

    // if (isDrawer) {
    //   styles.catalog.padding = 10;
    //   styles.catalog = {
    //     // width: window.innerWidth * 0.8,
    //     padding: 10
    //   };
    // }

    // {/*             <SubCatalog
    //               key={i}
    //               categories={childrenMap[parent.id]}
    //               // isDrawer={isDrawer}
    //             />

    // {cat.image && cat.image.src
    //   ? <Image
    //       style={{ width: 50, height: 50 }}
    //       source={{ uri: cat.image.src }}
    //     />
    //   : ""}

    return (
      <ScrollView contentContainerStyle={styles.mainScreen}>
        {startCats.map((parent, i) =>
          <View key={i}>
            <Text style={styles.categoryName}>
              {parent.name}
            </Text>
            <SubCatalog
              key={i}
              categories={childrenMap[parent.id]}
              navigation={navigation}
              // isDrawer={isDrawer}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
});

export default compose<any, any, any>(
  connect<IConnectedCatalogProps, {}, ICatalogProps>(mapStateToProps),
  graphql(
    gql(CATEGORIES_QUERY),
    {
      options: ({ layout, router }) => ({
        // skip: !(router.location.pathname === "/" || layout.openCatalog)
      })
    } as any
  )
)(Catalog as any);

// export default compose(
//   connect<IConnectedCatalogProps, {}, ICatalogProps>(mapStateToProps),
//   graphql(
//     gql(CATEGORIES_QUERY),
//     {
//       options: ({ layout, router }) => ({
//         // skip: !(router.location.pathname === "/" || layout.openCatalog)
//       })
//     } as any
//   )
// )(Catalog as any);
