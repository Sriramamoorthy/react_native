import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  TopNavigation,
  Text
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

  renderComponent()
  {

  }

  render() {
    let { selectedIndex } = this.state;
    let selectedComponent = <ContactList />;
    switch (selectedIndex) {
      case 0:
        selectedComponent = <ContactList/>
        break;
      case 1:
        selectedComponent = <ServiceList/>
        break;
      case 2:
        selectedComponent = <Settings/>
        break;
      default:
        selectedComponent = <ContactList/>
        break;
    }
    return (
      <React.Fragment>
        {selectedComponent}
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
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  bottomNavi: {
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
});
