import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import ContactList from "../ContactList/ContactList";

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

  render() {
    let { selectedIndex } = this.state;
    return (
      <React.Fragment>
        {selectedIndex === 0 ? <ContactList /> : null}
        <BottomNavigation
          selectedIndex={selectedIndex}
          onSelect={(index) => this.setSelectedIndex(index)}
          style={styles.bottomNavi}
        >
          <BottomNavigationTab
            icon={(props) => <Icon {...props} name="people" />}
          />
          <BottomNavigationTab
            icon={(props) => <Icon {...props} name="film" />}
          />
          <BottomNavigationTab
            icon={(props) => <Icon {...props} name="inbox" />}
          />
          <BottomNavigationTab
            icon={(props) => <Icon {...props} name="person" />}
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
