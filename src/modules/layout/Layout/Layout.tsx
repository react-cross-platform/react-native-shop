import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Header, SidebarCatalog } from "../index";

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
