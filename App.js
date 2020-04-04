import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import AppContainer from "./src/modules/HomePage/containers/AppContainer.js";
export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer />
      <Text>Open up App.js to start working on your sriram!</Text>
      <Button
        title="Press me"
        onPress={() => Alert.alert("Simple Button pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
