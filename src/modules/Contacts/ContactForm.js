import React from "react";
import { Layout, Input, Text, Button } from "@ui-kitten/components";
import { View, StyleSheet, ScrollView } from "react-native";
import PhoneInput from "react-native-phone-input";
import { getHeaderHeight, getInnerContainerHeight } from "../../selector/utils";
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.getData = this.getData.bind(this);
    this.state = {
      client_firstname: "",
      client_lastname: "",
      client_email: "",
      client_phone_code: "in",
      client_mobile: "",
      client_dial_number: "",
    };
  }

  onChangeText(val) {
    console.log(val);
  }

  onSelectCountry(a, b, c, d, e) {
    console.log(a, b, c, d, e);
  }

  onChangePhoneNumber(a, b, c, d, e) {
    console.log(a, b, c, d, e);
    console.log(this.phone);
  }

  getData() {
    console.log({
      value: this.phone.getValue(),
      countryCode: this.phone.getCountryCode(),
      isoCode: this.phone.getISOCode(),
    });
  }

  render() {
    let {
      client_email,
      client_firstname,
      client_lastname,
      client_mobile,
      client_phone_code,
    } = this.state;
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
            Contacts
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
        <Layout style={styles.listContainer}>
          <ScrollView
            style={{ padding: 10, height: "100%", overflow: "hidden" }}
          >
            <View style={styles.field}>
              <Text style={styles.label}>First Name</Text>
              <Input
                placeholder="Enter atleast 2 characters"
                value={client_firstname}
                onChangeText={this.onChangeText}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Last Name</Text>
              <Input
                placeholder="(Optional)"
                value={client_lastname}
                onChangeText={this.onChangeText}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="Email"
                value={client_email}
                onChangeText={this.onChangeText}
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
                onChangePhoneNumber={this.onChangePhoneNumber}
                onSelectCountry={this.onSelectCountry}
                value={client_mobile}
                initialCountry={client_phone_code}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="Email"
                value={client_email}
                onChangeText={this.onChangeText}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Address 1</Text>
              <Input
                placeholder="Email"
                value={client_email}
                onChangeText={this.onChangeText}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Address Line</Text>
              <Input
                placeholder="Address Line"
                value={client_email}
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder="City"
                value={client_email}
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder="State"
                value={client_email}
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder="Country"
                value={client_email}
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder="Zip Code"
                value={client_email}
                onChangeText={this.onChangeText}
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
