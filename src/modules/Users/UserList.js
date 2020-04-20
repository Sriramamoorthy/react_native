import React from "react";
import { connect } from "react-redux";
import { getUsers, updateUserUIState } from "../../actions/UserActions";
import {
  getFullName,
  getHeaderHeight,
  getInnerContainerHeight,
  getUserArray,
} from "../../selector/utils";
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import {
  ListItem,
  List,
  Icon,
  Divider,
  Layout,
  Text,
} from "@ui-kitten/components";
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.onClickUser = this.onClickUser.bind(this);
  }

  componentDidMount() {
    let { getUsers, updateUserUIState, hasMoreData } = this.props;
    if (hasMoreData) {
      getUsers().then(() => {
        updateUserUIState({
          hasMoreData: false,
        });
      });
    }
  }

  onClickUser(id) {
    console.log("sss", id);
    let { onClickUser } = this.props;
    onClickUser && onClickUser(id);
  }

  render() {
    const renderItemIcon = <Icon name="person" />;
    let { onClickAdd, userList } = this.props;

    const renderItem = ({ item, index }) => (
      <ListItem
        style={{ fontSize: 100 }}
        title={`${getFullName(
          item.appmt_user.first_name,
          item.appmt_user.last_name
        )}`}
        description={`${item.appmt_user.email}`}
        accessoryLeft={renderItemIcon}
        onPress={this.onClickUser.bind(this, item.user_id)}
      />
    );

    return (
      <Layout>
        <Layout style={styles.header} level="3">
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              left: 15,
            }}
          >
            Staff
          </Text>
          <TouchableWithoutFeedback onPress={onClickAdd}>
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
          </TouchableWithoutFeedback>
        </Layout>
        <Layout style={styles.listContainer}>
          {userList.length ? (
            <List
              style={styles.container}
              data={userList}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          ) : null}
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  listContainer: {
    height: getInnerContainerHeight(),
  },
});

const mapStateToProps = (state) => {
  const { users } = state;
  let userIds = state.ids.users || [];
  let userArray = getUserArray(users, userIds);
  return {
    users,
    userIds: state.ids.users || [],
    userList: userArray,
    hasMoreData: state.userUIState.hasMoreData,
  };
};

const mapDispatchToProps = { getUsers, updateUserUIState };

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
