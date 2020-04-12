import React from "react";
import { getHeaderHeight, getContainerHeight } from "../../selector/utils";
import { StyleSheet } from "react-native";

import { Layout } from "@ui-kitten/components";
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

  onSaveForm(payload) {
    console.log(payload);
  }

  componentDidMount() {}

  render() {
    let { selectedPage } = this.state;
    return (
      <Layout style={styles.mainContainer}>
        <Layout style={styles.container}>
          {selectedPage === "list" ? (
            <ContactList onClickAdd={this.onClickAdd} />
          ) : selectedPage === "addForm" ? (
            <ContactForm onSaveForm={this.onSaveForm} />
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
