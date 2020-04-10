import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import Login from "../Login/Login";
import { getMeta, toggleLogIn } from "../../actions";
import { connect } from "react-redux";
import ModuleContainer from "../ModuleContainer/ModuleContainer";
import { Image, StyleSheet } from "react-native";
import loader from "../../../assets/loading.gif";
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }
  componentDidMount() {
    let { getMeta, toggleLogIn } = this.props;
    getMeta().then((res) => {
      toggleLogIn();
      this.setState({
        isLoaded: true,
      });
    });
  }
  render() {
    let { isLoggedIn } = this.props;
    let { isLoaded } = this.state;
    return isLoaded ? (
      !isLoggedIn ? (
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Login />
        </Layout>
      ) : (
        <ModuleContainer />
      )
    ) : (
      <Image
        source={require("./../../../assets/loading.gif")}
        style={{
          width: 100,
          height: 100,
          textAlign: "center",
          position: "fixed",
          top: "40%",
          left: "40%",
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  const { isLoggedIn } = state;
  return { isLoggedIn };
};

const mapDispatchToProps = { getMeta, toggleLogIn };

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
