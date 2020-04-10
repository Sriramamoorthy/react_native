import React from "react";
import {
  Layout,
  Text,
  Input,
  Button,
  Icon,
  Divider,
} from "@ui-kitten/components";
import { StyleSheet, Alert, TouchableOpacity, Image, View } from "react-native";
import Request from "../../Request/Request";
import { connect } from "react-redux";
import { onLoginIn, getMeta } from "../../actions";
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

  componentDidMount() {}

  onPressLogin() {
    let { username, password } = this.state;
    let { onLoginIn, getMeta } = this.props;
    onLoginIn({
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
          padding: 10,
          width: "100%",
        }}
      >
        <Image
          source={require("../../../assets/logo-blue.png")}
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            marginBottom: 20,
          }}
        />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 20 }}>
          Welcome Back to Goschedule!
        </Text>
        <Input
          placeholder="Username"
          value={username}
          style={{ marginBottom: 6 }}
          status="primary"
          onChangeText={this.onChangeUsername}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          status="primary"
          style={{ marginBottom: 6 }}
          onChangeText={this.onChangePassword}
        />
        <Button
          style={styles.button}
          status="primary"
          onPress={this.onPressLogin}
        >
          Login
        </Button>
        <Divider />
        <Text style={{ color: "#1479fb", alignItems: "center", marginTop: 10 }}>
          Create new account
        </Text>
        <View
          style={{
            bottom: 20,
            position: "absolute",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 11 }}>
            For support and assistance, please write to
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            support@goschedule.io
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
          <Image
            source={require("../../../assets/microsoft.png")}
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}>Sign in with Microsoft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.GooglePlusStyle} activeOpacity={0.5}>
          <Image
            source={require("../../../assets/google.png")}
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}>Sign in with Google</Text>
        </TouchableOpacity> */}
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
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
  },
  GooglePlusStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#e4e4e4",
    height: 40,
    borderRadius: 5,
    margin: 5,
    width: "100%",
  },
  FacebookStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#e4e4e4",
    height: 40,
    borderRadius: 5,
    margin: 5,
    width: "100%",
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: "10%",
    resizeMode: "stretch",
  },
  TextStyle: {
    color: "#000000",
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
});

const mapStateToProps = (state) => {
  const { isLoggedIn } = state;
  return { isLoggedIn };
};

const mapDispatchToProps = { onLoginIn, getMeta };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
