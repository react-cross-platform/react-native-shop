import Category from "../../catalog/Category/Category";
import * as React from "react";
import { Text, View } from "antd-mobile";
import { StyleSheet, ScrollView } from "react-native";

import { Header, SidebarCatalog, Catalog } from "../index";
import { Products } from "../../catalog/index";
import { Product } from "../../product/index";

// const styles = require("./styles.css");
const styles = StyleSheet.create({ loading: {} });


    //     <Product subProductId="30454"/>

class Layout extends React.Component<any, any> {
  render() {
    return (
      <SidebarCatalog>
        <ScrollView
        // className={styles.layoutContent}
        >
          <Header />
          {this.props.children}
        </ScrollView>
      </SidebarCatalog>
    );

  }
}

export default Layout;
