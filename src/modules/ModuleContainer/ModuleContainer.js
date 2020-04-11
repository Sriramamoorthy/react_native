import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Text,
  Layout,
} from "@ui-kitten/components";
import { StyleSheet, Dimensions, View } from "react-native";
import ContactList from "../ContactList/ContactList";
import ServiceList from "../ServiceList/ServiceList";
import Settings from "../settings/Settings";

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
    let selectedComponent = <ContactList />;
    switch (selectedIndex) {
      case 0:
        selectedComponent = <ContactList />;
        break;
      case 1:
        selectedComponent = <ServiceList />;
        break;
      case 2:
        selectedComponent = <Settings />;
        break;
      default:
        selectedComponent = <ContactList />;
        break;
    }
    return (
      <Layout style={styles.container}>
        <Layout style={styles.layout1} level="3">
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              left: 15,
            }}
          >
            {selectedIndex === 0
              ? "Contacts"
              : selectedIndex === 1
              ? "Services"
              : "Settings"}
          </Text>
          <Icon
            style={{
              width: 32,
              height: 32,
              flex: 1,
              right: 15,
            }}
            fill="#8F9BB3"
            name="person-add"
          />
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
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  layout1: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.07,
    width: "100%",
    flexDirection: "row",
  },
  layout2: {
    height: Dimensions.get("window").height * 0.9,
  },
  layout3: {
    height: Dimensions.get("window").height * 0.03,
  },
});
