import React from "react";
import { StyleSheet, Text } from "react-native";

export default class AppContainer extends React.Component {
  render() {
    return <Text style={style.titleText}>Hey Sriram!</Text>;
  }
}

const style = StyleSheet.create({
  titleText: {
    fontSize: 20
  }
});
