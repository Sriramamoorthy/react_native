import React from "react";
import {
  Layout,
  Input,
  Text,
  Button,
  Icon,
  RadioGroup,
  Radio,
} from "@ui-kitten/components";
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { getHeaderHeight, getInnerContainerHeight } from "../../selector/utils";
import { getContact } from "../../actions";
import { getSingleContact } from "../../selector";
import { connect } from "react-redux";
import { ThemeService } from "@ui-kitten/components/theme/theme/theme.service";
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSave = this.onSave.bind(this);
    this.state = {
      payload: {
        first_name: "",
        last_name: "",
        email: "",
        role: "admin",
      },
      containerHeight: getInnerContainerHeight(),
    };
    this.keyboardWillShowListener = null;
  }

  componentDidMount() {
    let { mode } = this.props;
    if (mode === "edit") {
      let { user } = this.props;
      let payload = {
        first_name: user.appmt_user.first_name || "",
        last_name: user.appmt_user.last_name || "",
        email: user.appmt_user.email || "",
        role: user.role,
      };
      this.setState({
        payload: payload,
      });
    }
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow.bind(this)
    );
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide.bind(this)
    );
  }

  keyboardWillShow(e) {
    this.setState({
      containerHeight:
        getInnerContainerHeight() -
        e.endCoordinates.height +
        Dimensions.get("window").height * 0.05,
    });
  }

  keyboardWillHide(e) {
    this.setState({
      containerHeight: getInnerContainerHeight(),
    });
  }

  onChangeText(key, val) {
    let data = { [key]: val };
    let payload = Object.assign({}, this.state.payload, data);
    this.setState({
      payload: payload,
    });
  }

  onChangeRole(index) {
    let payload = this.state;
    this.setState({
      payload: Object.assign({}, this.state.payload, {
        role: index === 0 ? "admin" : "staff",
      }),
    });
  }

  validateData(payload) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (payload.first_name.length <= 2) {
      Alert.alert("Enter a valid First name");
      return false;
    } else if (payload.email == "" || !emailRegex.test(payload.email)) {
      Alert.alert("Enter a valid Email");
      return false;
    }
    return true;
  }

  onSave() {
    let { onSaveForm } = this.props;
    let { mode, userId } = this.props;
    let payload = this.state.payload;
    let isValidData = this.validateData(payload);
    if (isValidData) {
      onSaveForm && onSaveForm(mode, payload, userId);
    }
  }

  render() {
    let { first_name, last_name, email, role } = this.state.payload;
    let { containerHeight } = this.state;
    let { onClickBack } = this.props;
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
              left: 10,
            }}
          >
            Create Staff
          </Text>
          <Text
            style={{
              right: 15,
              color: "#005dff",
              fontWeight: "bold",
            }}
            onPress={this.onSave}
          >
            Save
          </Text>
        </Layout>
        <Layout style={{ height: containerHeight }}>
          <ScrollView
            style={{ padding: 10, height: "100%", overflow: "hidden" }}
          >
            <View style={styles.field}>
              <Text style={styles.label}>First Name</Text>
              <Input
                placeholder="Enter atleast 2 characters"
                value={first_name}
                onChangeText={this.onChangeText.bind(this, "first_name")}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Last Name</Text>
              <Input
                placeholder="(Optional)"
                value={last_name}
                onChangeText={this.onChangeText.bind(this, "last_name")}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={this.onChangeText.bind(this, "email")}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Address Line</Text>
              <RadioGroup
                style={{ width: "100%" }}
                selectedIndex={role === "admin" ? 0 : 1}
                onChange={this.onChangeRole}
              >
                <Radio text="Admin"></Radio>
                <Radio text="Staff"></Radio>
              </RadioGroup>
            </View>
          </ScrollView>
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 5,
    marginTop: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#747d8c",
    marginLeft: 2,
  },
  header: {
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
  let mode = props.mode;
  let user = mode === "edit" ? state.users[props.userId] : {};
  return {
    user,
  };
};

const mapDispatchToProps = { getContact };

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
