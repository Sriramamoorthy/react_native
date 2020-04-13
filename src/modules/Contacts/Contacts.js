import React from "react";
import { getHeaderHeight, getContainerHeight } from "../../selector/utils";
import { StyleSheet } from "react-native";

import { Layout } from "@ui-kitten/components";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ContactDetailView from "./ContactDetailView";
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "list",
      selectedContact: null,
    };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.goToList = this.goToList.bind(this);
    this.onClickContact = this.onClickContact.bind(this);
  }

  onClickAdd() {
    this.setState({
      selectedPage: "addForm",
    });
  }

  onClickContact(id) {
    this.setState({
      selectedPage: "detailview",
      selectedContact: id,
    });
  }

  goToList() {
    this.setState({
      selectedPage: "list",
    });
  }

  onSaveForm(payload) {
    console.log(payload);
  }

  componentDidMount() {}

  render() {
    let { selectedPage, selectedContact } = this.state;
    return (
      <Layout style={styles.mainContainer}>
        <Layout style={styles.container}>
          {selectedPage === "list" ? (
            <ContactList
              onClickAdd={this.onClickAdd}
              onClickContact={this.onClickContact}
            />
          ) : selectedPage === "addForm" ? (
            <ContactForm
              onSaveForm={this.onSaveForm}
              onClickBack={this.goToList}
            />
          ) : selectedPage === "detailview" ? (
            <ContactDetailView
              id={selectedContact}
              onClickBack={this.goToList}
            />
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
