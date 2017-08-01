import { Text, View, Flex, Icon } from "antd-mobile";
import * as React from "react";

import { Modal, utils } from "../../layout/index";
import { HEIGHT } from "../Header/Header";
import { StyleSheet, Image } from "react-native";

// const styles = require("./styles.css");
const styles = StyleSheet.create({

})

function createMarkup(html) {
  return { __html: html };
}

class FlatPageModal extends React.Component<any, any> {
  back = e => {
    e.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { match, history, location: { state: { pages } } } = this.props;
    const id = match.params.id;
    const page = pages.filter(el => el.id === id);
    return (
      <Modal>
        <Flex
          // className={styles.backPanel}
          justify="start"
          align="center"
        >
          {/*
          <Icon
            className={styles.backIcon}
            type={require("!svg-sprite-loader!./back.svg")}
            size="md"
            style={{ height: HEIGHT }}
            onClick={this.back}
          />
 */}
          <Text
          // className={styles.title}
          >
            {page.map(el => el.name)}
          </Text>
        </Flex>
        <View
          // className={styles.flatpage}
          dangerouslySetInnerHTML={createMarkup(page.map(el => el.content))}
          style={{
            marginTop: 100,
            padding: utils.isSafariBrowser() ? 20 : 0,
            textAlign: "left"
          }}
        />
      </Modal>
    );
  }
}

export default FlatPageModal;
