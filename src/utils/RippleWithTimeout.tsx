import React from "react";
import Ripple from "react-native-material-ripple";

const RippleWithTimeout = props => {
  const { onPress, ..._props } = props;
  return (
    <Ripple {..._props} onPress={() => setTimeout(onPress, props.timeOut)}>
      {props.children}
    </Ripple>
  );
};

export default RippleWithTimeout;
