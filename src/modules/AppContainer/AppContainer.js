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
    getMeta()
      .then((res) => {
        toggleLogIn(true);
        this.setState({
          isLoaded: true,
        });
      })
      .catch((err) => {
        toggleLogIn(false);
        this.setState({ isLoaded: true });
      });
  }
  render() {
    let { isLoggedIn, isMetaLoaded } = this.props;
    let { isLoaded } = this.state;
    return isLoaded ? (
      !isLoggedIn ? (
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Login />
        </Layout>
      ) : isMetaLoaded ? (
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ModuleContainer />
        </Layout>
      ) : (
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("./../../../assets/loading.gif")}
            style={{
              width: 75,
              height: 75,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Layout>
      )
    ) : (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={require("./../../../assets/loading.gif")}
          style={{
            width: 75,
            height: 75,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggedIn, orgData } = state;
  return { isLoggedIn, isMetaLoaded: orgData ? true : false };
};

const mapDispatchToProps = { getMeta, toggleLogIn };

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
