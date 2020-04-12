import React from "react";
import { connect } from "react-redux";
import { getContacts, updateContactUIState } from "../../actions";
import {
  getFullName,
  getHeaderHeight,
  getContainerHeight,
} from "../../selector/utils";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import {
  ListItem,
  List,
  Icon,
  Divider,
  Button,
  Layout,
  Text,
} from "@ui-kitten/components";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "list",
    };
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onClickAdd() {
    this.setState({
      selectedPage: "addForm",
    });
  }

  componentDidMount() {}

  render() {
    let { selectedPage } = this.state;
    return (
      <Layout style={styles.mainContainer}>
        <Layout style={styles.header} level="3">
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              left: 15,
            }}
          >
            Contacts
          </Text>
          <TouchableWithoutFeedback onPress={this.onClickAdd}>
            {selectedPage === "list" ? (
              <Icon
                style={{
                  width: 32,
                  height: 32,
                  flex: 1,
                  right: 15,
                }}
                fill="#005dff"
                name="person-add"
              />
            ) : (
              <Text
                style={{ color: "#005dff", right: 15, fontWeight: "bold" }}
                onPress={this.onClickSave}
              >
                Save
              </Text>
            )}
          </TouchableWithoutFeedback>
        </Layout>
        <Layout style={styles.container}>
          {selectedPage === "list" ? (
            <ContactList />
          ) : selectedPage === "addForm" ? (
            <ContactForm />
          ) : null}
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    fontSize: 24,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: getHeaderHeight(),
    width: "100%",
    flexDirection: "row",
  },
  container: {
    height: getContainerHeight(),
  },
});

export default Contacts;
