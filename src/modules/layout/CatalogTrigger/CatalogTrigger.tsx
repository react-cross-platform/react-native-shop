import { ACTION_SET_CATALOG_DRAWER } from "../constants";
import { Text, View, Icon, Button } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ILayout } from "../model";

interface IConnectedCatalogTriggerProps {
  layout: ILayout;
  dispatch: Dispatch<{}>;
}

interface ICatalogTriggerProps {
  height: number;
}

class CatalogTrigger extends React.Component<
  IConnectedCatalogTriggerProps & ICatalogTriggerProps,
  any
> {
  handleClick = () => {
    this.props.dispatch({ type: ACTION_SET_CATALOG_DRAWER, openCatalog: true });
  };

  render() {
    const { layout, height, dispatch } = this.props;
    return (
      <View>
        <Button onClick={this.handleClick}>КАТАЛОГ</Button>
      </View>
    );
    // return (
    //   <Icon
    //     type={require("!svg-sprite-loader!./catalog.svg")}
    //     size="md"
    //     onClick={() => toggleCatalog(dispatch)}
    //     style={{
    //       fill: layout.openCatalog ? "orange" : "white",
    //       height,
    //       padding: `0 ${height / 3}px`
    //     }}
    //   />
    // );
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
});

export default compose(
  connect<IConnectedCatalogTriggerProps, {}, ICatalogTriggerProps>(
    mapStateToProps
  )
)(CatalogTrigger);
