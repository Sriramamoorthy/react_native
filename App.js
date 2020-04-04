import React from "react";
import AppContainer from "./src/modules/HomePage/containers/AppContainer.js";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { mapping, light as lightTheme } from "@eva-design/eva";

export default function App() {
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AppContainer />
    </ApplicationProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
