import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text,
  Layout,
} from "@ui-kitten/components";
import { StyleSheet, Dimensions, View, StatusBar } from "react-native";
import Contacts from "../Contacts/Contacts";
import ServiceList from "../ServiceList/ServiceList";
import Settings from "../settings/Settings";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Users from "../Users/Users";

export default class ModuleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
  }

  setSelectedIndex(val) {
    this.setState({
      selectedIndex: val,
    });
  }

  renderComponent() {}

  render() {
    let { selectedIndex } = this.state;
    let selectedComponent = <Contacts />;
    switch (selectedIndex) {
      case 0:
        selectedComponent = <Contacts />;
        break;
      case 1:
        selectedComponent = <ServiceList />;
        break;
      case 2:
        selectedComponent = <Settings />;
        break;
      case 3:
        selectedComponent = <Users />;
        break;
      default:
        selectedComponent = <Contacts />;
        break;
    }
    return (
      <Layout style={styles.container}>
        <Layout style={styles.layout1}>
          <StatusBar backgroundColor="black" barStyle="red" />
        </Layout>
        <Layout style={styles.layout2} level="2">
          {selectedComponent}
        </Layout>

        <Layout style={styles.layout3} level="1">
          <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={(index) => this.setSelectedIndex(index)}
            style={styles.bottomNavi}
          >
            <BottomNavigationTab
              icon={(props) => <Icon {...props} name="people" />}
            />
            <BottomNavigationTab
              icon={(props) => <Icon {...props} name="briefcase-outline" />}
            />
            <BottomNavigationTab
              icon={(props) => <Icon {...props} name="inbox" />}
            />
            <BottomNavigationTab
              icon={(props) => <Icon {...props} name="person" />}
            />
            <BottomNavigationTab
              icon={(props) => <Icon {...props} name="settings-2-outline" />}
            />
          </BottomNavigation>
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  bottomNavi: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    color: "#005dff",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  layout2: {
    height: Dimensions.get("window").height * 0.97 - getStatusBarHeight(),
  },
  layout3: {
    height: Dimensions.get("window").height * 0.03,
  },
  layout1: {
    height: getStatusBarHeight(),
  },
});
