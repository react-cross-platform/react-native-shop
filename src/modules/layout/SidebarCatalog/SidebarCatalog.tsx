import { Drawer } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ACTION_SET_CATALOG_DRAWER } from "../constants";
import { Catalog } from "../index";
import { ILayout } from "../model";
import { swipeEnabled } from "../utils";

interface IConnectedSideBarProps {
  layout: ILayout;
  dispatch: Dispatch<{}>;
}

class SidebarCatalog extends React.Component<IConnectedSideBarProps, any> {
  // Trick to cancel on Safari but not

  handleChange = isOpen => {
    const { layout } = this.props;
    if (isOpen !== layout.openCatalog) {
      this.props.dispatch({
        type: ACTION_SET_CATALOG_DRAWER,
        openCatalog: isOpen
      });
    }
  };

  render() {
    const { layout, dispatch } = this.props;
    console.log("layout catalog", layout.openCatalog);
    // Trick for Safari to disable forward swike but enable swipe back
    // to prevent conflict with Safary's prev/next history actions
    // const dragToggleDistance = swipeEnabled() ? 60 : 0;
    const dragToggleDistance = 60;
    return (
      <Drawer
        onOpenChange={this.handleChange}
        open={layout.openCatalog === true}
        sidebar={<Catalog isDrawer={true} />}
        drawerWidth={350}
        // RN
        drawerBackgroundColor="white"
      >
        {this.props.children}
      </Drawer>
    );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
});

export default compose(
  connect<IConnectedSideBarProps, {}, any>(mapStateToProps)
)(SidebarCatalog);
