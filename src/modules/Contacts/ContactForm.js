import React from "react";
import { Layout, Input, Text, Button } from "@ui-kitten/components";
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import { getHeaderHeight, getInnerContainerHeight } from "../../selector/utils";
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.getData = this.getData.bind(this);
    this.onSave = this.onSave.bind(this);
    this.state = {
      payload: {
        client_firstname: "",
        client_lastname: "",
        client_email: "",
        client_phone_code: "in",
        client_mobile: "",
        client_dial_number: "",
        client_address_line: "",
        client_address_line2: "",
        client_state: "",
        client_country: "",
        client_pincode: "",
      },
      containerHeight: getInnerContainerHeight(),
    };
    this.keyboardWillShowListener = null;
  }

  componentDidMount() {
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

  getData() {
    if (this.phone.isValidNumber()) {
      return {
        client_mobile: this.phone.getValue(),
        client_dial_number: this.phone.getCountryCode(),
        client_phone_code: this.phone.getISOCode(),
      };
    } else {
      return false;
    }
  }

  validateData(payload, phonedata) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (payload.client_firstname.length <= 2) {
      Alert.alert("Enter a valid First name");
      return false;
    } else if (!phonedata && payload.client_email === "") {
      Alert.alert("Enter email or phone");
      return false;
    } else if (
      payload.client_email != "" &&
      !emailRegex.test(payload.client_email)
    ) {
      Alert.alert("Enter a valid Email");
      return false;
    }
    return true;
  }

  onSave() {
    let { onSaveForm } = this.props;
    let payload = Object.assign({}, this.state.payload);
    let phonedata = this.getData();
    let isValidData = this.validateData(payload, phonedata);
    if (isValidData) {
      if (phonedata) {
        payload = Object.assign(payload, phonedata);
      } else {
        Alert.alert(`Enter a valid phone number`);
        return;
      }
      onSaveForm && onSaveForm(payload);
    }
  }

  render() {
    let {
      client_email,
      client_firstname,
      client_lastname,
      client_mobile,
      client_phone_code,
      client_address_line,
      client_address_line2,
      client_state,
      client_country,
      client_pincode,
    } = this.state.payload;
    let { containerHeight } = this.state;
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
            Create Contact
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
                value={client_firstname}
                onChangeText={this.onChangeText.bind(this, "client_firstname")}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Last Name</Text>
              <Input
                placeholder="(Optional)"
                value={client_lastname}
                onChangeText={this.onChangeText.bind(this, "client_lastname")}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="Email"
                value={client_email}
                onChangeText={this.onChangeText.bind(this, "client_email")}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Phone</Text>
              <PhoneInput
                style={{
                  borderStyle: "solid",
                  width: "100%",
                  borderRadius: "5px",
                  height: 40,
                  borderWidth: 1,
                  backgroundColor: "#F7F9FC",
                  borderColor: "#E4E9F2",
                  paddingLeft: 15,
                }}
                flagStyle={{
                  borderStyle: "solid",
                  borderBottomColor: "red",
                  borderWidth: 1,
                }}
                ref={(ref) => {
                  this.phone = ref;
                }}
                value={client_mobile}
                initialCountry={client_phone_code}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Address Line</Text>
              <Input
                placeholder="Address Line"
                value={client_address_line}
                onChangeText={this.onChangeText.bind(
                  this,
                  "client_address_line"
                )}
              />
              <Input
                placeholder="City"
                value={client_address_line2}
                onChangeText={this.onChangeText.bind(
                  this,
                  "client_address_line2"
                )}
              />
              <Input
                placeholder="State"
                value={client_state}
                onChangeText={this.onChangeText.bind(this, "client_state")}
              />
              <Input
                placeholder="Country"
                value={client_country}
                onChangeText={this.onChangeText.bind(this, "client_country")}
              />
              <Input
                placeholder="Zip Code"
                value={client_pincode}
                onChangeText={this.onChangeText.bind(this, "client_pincode")}
              />
            </View>
            {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button style={{ margin: 5 }} onPress={this.onSave} size="small">
            Save
          </Button>
          <Button
            style={{ margin: 5 }}
            onPress={this.onCancel}
            size="small"
            status="basic"
          >
            Cancel
          </Button>
        </View> */}
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
export default ContactForm;
