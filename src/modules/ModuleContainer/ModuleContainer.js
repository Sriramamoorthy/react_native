import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  TopNavigation,
  Text,
  Layout,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
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
          <Text style={{ fontWeight: "bold" }}>
            {selectedIndex === 0
              ? "Contacts"
              : selectedIndex === 1
              ? "Services"
              : "Settings"}
          </Text>
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
    height: "7%",
    width: "100%",
  },
  layout2: {
    height: "88%",
  },
  layout3: {
    height: "5%",
  },
});
