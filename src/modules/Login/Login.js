import React from "react";
import { Layout, Text, Input, Button, Icon } from "@ui-kitten/components";
import { StyleSheet, Alert } from "react-native";
import Request from "../../Request/Request";
import { connect } from "react-redux";
import { getMeta } from "../../actions";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onChangePassword(val) {
    this.setState({ password: val });
  }

  onChangeUsername(val) {
    this.setState({ username: val });
  }

  componentDidMount() {
    console.log("shi");
    let { getMeta } = this.props;
    getMeta();
  }

  onPressLogin() {
    let { username, password } = this.state;
    Request("https://api.goschedule.io/accounts/signin")
      .post({
        email: username,
        password: password,
      })
      .then((res) => {
        this.showAlert(true);
      })
      .catch((err) => {
        this.showAlert(false);
      });
  }

  showAlert(status) {
    if (status) {
      Alert.alert(`Logged in successfully`);
    } else {
      Alert.alert(`Logged in failed`);
    }
  }

  render() {
    let { username, password } = this.state;
    return (
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
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
        <Button
          style={styles.button}
          status="primary"
          onPress={this.onPressLogin}
          icon={() => <Icon name="facebook" />}
        >
          Login
        </Button>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    margin: 8,
  },
});

const mapStateToProps = (state) => {
  const { friendReducer } = state;
  return { friendReducer };
};

const mapDispatchToProps = { getMeta };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
