import React from "react";
import { Layout, Input, Text } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(val) {
    console.log(val);
  }
  render() {
    let value = "";
    return (
      <Layout style={{ padding: 10 }}>
        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <Input
            placeholder="Enter atleast 2 characters"
            value={value}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Last Name</Text>
          <Input
            placeholder="(Optional)"
            value={value}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Input
            placeholder="Email"
            value={value}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <Input
            placeholder="Place your Text"
            value={value}
            onChangeText={this.onChangeText}
          />
        </View>
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
});
export default ContactForm;
