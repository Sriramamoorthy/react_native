import React from "react";
import { connect } from "react-redux";
import { getContact, updateContactUIState } from "../../actions";
import {
  getFullName,
  getHeaderHeight,
  getInnerContainerHeight,
} from "../../selector/utils";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ListItem,
  List,
  Icon,
  Divider,
  Layout,
  Text,
  Card,
  TabBar,
  Tab,
} from "@ui-kitten/components";
class UserDetailView extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickEdit(id) {
    let { onClickEdit } = this.props;
    onClickEdit && onClickEdit(id);
  }

  render() {
    let { appmt_user, user_id } = this.props.user;
    let { onClickBack } = this.props;
    let fullName = getFullName(appmt_user.first_name, appmt_user.last_name);

    return (
      <Layout>
        <Layout style={styles.header} level="3">
          <TouchableWithoutFeedback onPress={onClickBack}>
            <Icon
              style={{
                width: 32,
                height: 32,
              }}
              fill="#000000"
              name="arrow-ios-back-outline"
            />
          </TouchableWithoutFeedback>
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              left: 15,
            }}
          >
            User DetailView
          </Text>
          <TouchableWithoutFeedback
            onPress={this.onClickEdit.bind(this, user_id)}
          >
            <Icon
              style={{
                width: 32,
                height: 32,
                flex: 1,
                right: 15,
              }}
              fill="#005dff"
              name="edit"
            />
          </TouchableWithoutFeedback>
        </Layout>
        <Layout style={styles.listContainer}>
          <Card>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {fullName}
              </Text>
              <Text>{appmt_user.email}</Text>
            </View>
          </Card>
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

const mapStateToProps = (state, props) => {
  let userId = props.id;
  let user = state.users[userId];
  return {
    user,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailView);
