import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import Login from "../../Login/containers/Login";

export default class AppContainer extends React.Component {
  render() {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Login />
      </Layout>
    );
  }
}

// const style = StyleSheet.create({
//   titleText: {
//     fontSize: 20
//   }
// });
