import { WingBlank } from "antd-mobile";
import * as React from "react";
import { StyleSheet, View, WebView } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 650
  },
  content: {
    paddingTop: 40
  }
});

interface IConnectedFlatPageScreenProps {}

interface IFlatPageScreenProps {
  name: string;
  content: string;
  navigation: any;
}

class FlatPageScreen extends React.Component<
  IConnectedFlatPageScreenProps & IFlatPageScreenProps,
  null
> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.name}`
  });

  render() {
    const { navigation } = this.props;
    const { content } = navigation.state.params;
    return (
      <View style={styles.container}>
        <WingBlank size="sm">
          <WebView
            style={styles.content}
            source={{ html: content }}
            ref={"webview"}
            scrollEnabled={true}
          />
        </WingBlank>
      </View>
    );
  }
}

export default FlatPageScreen;
