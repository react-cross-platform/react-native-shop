import { List, Text, View } from "antd-mobile";
import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";
import { Image, StyleSheet } from "react-native";

import { Loading } from "..";
import { IData } from "../../../model";
import { IFlatPage } from "../model";

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
  },

  icon: {
    width: 26,
    height: 26
  },

  name: {
    fontSize: 18,
    paddingLeft: 12
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
  static navigationOptions = {
    tabBarLabel: "ИНФО",
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("../../../../images/info.png")}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  getIcon = id => {
    const _id = parseInt(id);
    switch (_id) {
      // info
      case 4: {
        return require("../../../../images/flat-page-info.png");
      }
      // contacts
      case 5: {
        return require("../../../../images/flat-page-contacts.png");
      }
      // exchange and return
      case 8: {
        return require("../../../../images/flat-page-exchange.png");
      }
      // make order
      case 7: {
        return require("../../../../images/flat-page-order.png");
      }
      // buyers
      case 10: {
        return require("../../../../images/flat-page-buyers.png");
      }
      // discount card
      case 6: {
        return require("../../../../images/flat-page-discount.png");
      }
      // shipping and payment
      case 2: {
        return require("../../../../images/flat-page-delivery.png");
      }
      // guarantee
      case 3: {
        return require("../../../../images/flat-page-guarantee.png");
      }
      default: {
        return require("../../../../images/flat-page-info.png");
      }
    }
  };

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
          {flatPages.map(page => (
            <List.Item
              key={page.name}
              wrap={true}
              arrow="horizontal"
              thumb={
                <Image
                  style={{ width: 20, height: 20 }}
                  source={this.getIcon(page.id)}
                />
              }
              onClick={() => {
                this.handleNavigation(page.name, page.content);
              }}
            >
              <Text style={styles.name}>{page.name}</Text>
            </List.Item>
          ))}
        </List>
      </View>
    );
  }
}

export default graphql<any, any, any>(gql(FLATPAGES_QUERY))(FlatPages as any);
