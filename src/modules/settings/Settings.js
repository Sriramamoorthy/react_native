import React from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { ListItem, List, Icon, Divider, Button } from "@ui-kitten/components";
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {

    let settings = [
      {
        settings_name: "General Settings",
        settings_description: "Configure basic business and general information"
      },
      {
        settings_name: "Business Hours",
        settings_description: "Configure business hour availability"
      },
      {
        settings_name: "Booking Page",
        settings_description: "Customize Booking page"
      },
      {
        settings_name: "Payment Integrations",
        settings_description: "Configure payment gateway"
      },
      {
        settings_name: "Integrations",
        settings_description: "Configure Third Party Integrations"
      },
      {
        settings_name: "E-mail Support",
        settings_description: "24x5 Support via E-Mail"
      },
      {
        settings_name: "Phone Support",
        settings_description: "12x5 Phone Support"
      },
      {
        settings_name: "Privacy Policy",
        settings_description: ""
      },
      {
        settings_name: "Cookie Policy",
        settings_description: ""
      },
      {
        settings_name: "Terms of Service",
        settings_description: ""
      },
      {
        settings_name: "Open Source License",
        settings_description: ""
      },
      {
        settings_name: "What's New",
        settings_description: ""
      }
    ]

    const renderItem = ({ item, index }) => (
      <ListItem
        title={`${item.settings_name}`}
        description={`${item.settings_description}`}
      />
    );

    return settings.length ? (
      <List
        style={styles.container}
        data={settings}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    height: "95%",
    width: "100%",
    position: "absolute",
    fontSize: 24,
  },
});
