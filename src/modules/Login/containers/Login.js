import React from "react";
import { Layout, Text, Input, Button, Icon } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const StarIcon = style => <Icon {...style} name="facebook" />;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  onChangePassword(val) {
    this.setState({ password: val });
  }

  onChangeUsername(val) {
    this.setState({ username: val });
  }

  render() {
    let { username, password } = this.state;
    return (
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Input
          placeholder="Username"
          value={username}
          status="primary"
          style={{ margin: 8 }}
          onChangeText={this.onChangeUsername}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          style={{ margin: 8 }}
          value={password}
          status="primary"
          onChangeText={this.onChangePassword}
        />
        <Button style={styles.button} status="primary">
          PRIMARY
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    margin: 8
  }
});

// const style = StyleSheet.create({
//   titleText: {
//     fontSize: 20
//   }
// });
