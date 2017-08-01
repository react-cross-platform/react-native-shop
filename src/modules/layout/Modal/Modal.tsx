import { Modal } from "antd-mobile";
import * as React from "react";
import { StyleSheet } from "react-native";

// const styles = require("./styles.css");
const styles = StyleSheet.create({});

const MyModal = props => {
  return (
    <Modal
      // className={styles.modal}
      visible={true}
      transparent={false}
      animated={false}
    >
      {props.children}
    </Modal>
  );
};

export default MyModal;
