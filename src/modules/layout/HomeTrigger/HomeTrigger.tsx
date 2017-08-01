import { Text, View, Flex, Icon } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Link } from "react-router-native";
import { Dispatch } from "redux";
import { StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";

// import { IRouterReducer } from "../../../interfaces";
import { ILayout } from "../model";

// const styles = require("./styles.css");
const styles = StyleSheet.create({});

interface IConnectedHomeTriggerProps {
  // router: IRouterReducer;
  dispatch: Dispatch<{}>;
  layout: ILayout;
}

interface IHomeTriggerProps {
  height: number;
}

const Logo = ({ height, isActive }) => {
  return (
    <Flex
      // className={styles.homeTrigger}
      align="center"
      style={{
        height
        // padding: `0 20px`
      }}
    >
      <Ripple>
        <Text>REACT</Text>
        {/*       <Icon
        // className={styles.logoIcon}
        type={require("!svg-sprite-loader!./logo.svg")}
        size="md"
        style={{
          fill: isActive ? "orange" : "white"
        }}
      />
 */}
        <Text>SHOP</Text>
      </Ripple>
    </Flex>
  );
};

class HomeTrigger extends React.Component<
  IConnectedHomeTriggerProps & IHomeTriggerProps,
  any
> {
  handleClick = () => {
    console.log("HELLO");
    console.log("HELLO");
  };

  render() {
    const {
      // router,
      height
    } = this.props;
    // const isActive = router.location.pathname === "/";
    const isActive = false;
    if (isActive) {
      return <Logo height={height} isActive={true} />;
    } else {
      return (
        <Ripple>
          <Link to="/">
            <Text onClick={this.handleClick}>HOME</Text>

            {/* <Logo height={height} isActive={false} /> */}
          </Link>
        </Ripple>
      );
    }
  }
}

const mapStateToProps: any = state => ({
  layout: state.layout
  // router: state.router
});

export default compose(
  connect<IConnectedHomeTriggerProps, {}, IHomeTriggerProps>(mapStateToProps)
)(HomeTrigger);
