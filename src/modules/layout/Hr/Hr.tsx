import React, { Component } from "react";
import {View, StyleSheet} from "react-native";


const styles = StyleSheet.create({
  root: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  }
})

class Hr extends Component<any, any> {

  render(){
    return (
      <View style={styles.root}/>
    )
  }
}

export default Hr;
