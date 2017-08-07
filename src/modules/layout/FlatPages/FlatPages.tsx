import { List, Text, View } from "antd-mobile";
import * as React from "react";
import { gql, graphql } from "react-apollo";
import { StyleSheet, TouchableHighlight } from "react-native";
import { Dispatch } from "redux";

import { IData } from "../../../model";
import { Loading } from "../index";
import { IFlatPage, ILayout } from "../model";

const FLATPAGES_QUERY = `
  query flatpages {
    flatPages {
      id
      name
      content
    }
  }
`;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    margin: 20
  }
});

interface IFlatPagesProps {
  navigation: any;
}

interface IFlatPagesData extends IData {
  flatPages: [IFlatPage];
}

interface IConnectedFlatPagesProps {
  data: IFlatPagesData;
}

class FlatPages extends React.Component<
  IConnectedFlatPagesProps & IFlatPagesProps,
  any
> {
  handleNavigation = (name, content) => {
    const { navigation } = this.props;
    navigation.navigate("FlatPage", { name, content });
  };

  render() {
    const { data } = this.props;
    const { loading, flatPages } = data;
    if (loading === true) {
      return <Loading />;
    }

    return (
      <View>
        <Text style={styles.title}>Инфо</Text>
        <List>
          {flatPages.map(page =>
            <List.Item
              onClick={() => {
                this.handleNavigation(page.name, page.content);
              }}
              key={page.name}
              wrap={true}
              arrow="horizontal"
            >
              {page.name}
            </List.Item>
          )}
        </List>
      </View>
    );
  }
}

export default graphql<any, any, any>(
  gql(FLATPAGES_QUERY) as any
  // {
  //   options: ({ layout, router }) => ({
  //     skip: !(router.location.pathname === "/" || layout.openMenu)
  //   })
  // } as any
)(FlatPages as any);
