import React from "react";
import { getHeaderHeight, getContainerHeight } from "../../selector/utils";
import { StyleSheet, Alert } from "react-native";

import { Layout } from "@ui-kitten/components";
import UserList from "./UserList";
import UserForm from "./UserForm";
import UserDetailView from "./UserDetailView";
import { createUser, updateUser } from "../../actions/UserActions";
import { connect } from "react-redux";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "list",
      selectedUser: null,
    };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.goToList = this.goToList.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickUser = this.onClickUser.bind(this);
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
      selectedUser: id,
    });
  }

  onClickUser(id) {
    this.setState({
      selectedPage: "detailview",
      selectedUser: id,
    });
  }

  goToList() {
    this.setState({
      selectedPage: "list",
    });
  }

  onSaveForm(mode, payload, userId) {
    let { createUser, updateUser } = this.props;
    console.log(payload);
    if (mode != "edit") {
      createUser(payload)
        .then((res) => {
          console.log("omg", res);
          this.setState({
            selectedPage: "detailview",
            selectedUser: res["data"].ids[0],
          });
        })
        .catch((err) => {
          console.log(err);
          return Alert.alert("Something went wrong. Please try again later!");
        });
    } else {
      updateUser(userId, payload)
        .then((res) => {
          console.log("omg", res);
          this.setState({
            selectedPage: "detailview",
            selectedUser: userId,
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
    let { selectedPage, selectedUser } = this.state;
    return (
      <Layout style={styles.mainContainer}>
        <Layout style={styles.container}>
          {selectedPage === "list" ? (
            <UserList
              onClickAdd={this.onClickAdd}
              onClickUser={this.onClickUser}
            />
          ) : selectedPage === "addForm" || selectedPage === "editForm" ? (
            <UserForm
              onSaveForm={this.onSaveForm}
              onClickBack={this.goToList}
              userId={selectedUser}
              mode={selectedPage === "addForm" ? "add" : "edit"}
            />
          ) : selectedPage === "detailview" ? (
            <UserDetailView
              id={selectedUser}
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
  createUser,
  updateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
