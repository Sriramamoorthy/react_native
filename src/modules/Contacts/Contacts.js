import React from "react";
import { getHeaderHeight, getContainerHeight } from "../../selector/utils";
import { StyleSheet, Alert } from "react-native";

import { Layout } from "@ui-kitten/components";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ContactDetailView from "./ContactDetailView";
import { createContact, updateContact } from "../../actions";
import { connect } from "react-redux";
class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "list",
      selectedContact: null,
    };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.goToList = this.goToList.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickContact = this.onClickContact.bind(this);
    this.onSaveForm = this.onSaveForm.bind(this);
  }

  onClickAdd() {
    this.setState({
      selectedPage: "addForm",
    });
  }

  onClickEdit(id) {
    this.setState({
      selectedPage: "editForm",
      selectedContact: id,
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

  onSaveForm(mode, payload, contactId) {
    let { createContact, updateContact } = this.props;
    console.log(payload);
    if (mode != "edit") {
      createContact(payload)
        .then((res) => {
          console.log("omg", res);
          this.setState({
            selectedPage: "detailview",
            selectedContact: res["data"].ids[0],
          });
        })
        .catch((err) => {
          console.log(err);
          return Alert.alert("Something went wrong. Please try again later!");
        });
    } else {
      updateContact(contactId, payload)
        .then((res) => {
          console.log("omg", res);
          this.setState({
            selectedPage: "detailview",
            selectedContact: contactId,
          });
        })
        .catch((err) => {
          console.log(err);
          return Alert.alert("Something went wrong. Please try again later!");
        });
    }
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
          ) : selectedPage === "addForm" || selectedPage === "editForm" ? (
            <ContactForm
              onSaveForm={this.onSaveForm}
              onClickBack={this.goToList}
              contactId={selectedContact}
              mode={selectedPage === "addForm" ? "add" : "edit"}
            />
          ) : selectedPage === "detailview" ? (
            <ContactDetailView
              id={selectedContact}
              onClickBack={this.goToList}
              onClickEdit={this.onClickEdit}
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

let mapStateToProps = (state, props) => {
  return {};
};

let mapDispatchToProps = {
  createContact,
  updateContact,
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
