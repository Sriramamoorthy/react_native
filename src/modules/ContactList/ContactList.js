import React from "react";
import { connect } from "react-redux";
import { getContacts } from "../../actions";
import { StyleSheet } from "react-native";
import { ListItem, List, Icon } from "@ui-kitten/components";
class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { getContacts } = this.props;
    getContacts()
      .then((res) => console.log(res))
      .catch((err) => console.log("error", err));
  }

  render() {
    let { contacts } = this.props;
    console.log("contacts", contacts.length);
    return contacts.length ? (
      <List
        style={styles.container}
        data={contacts}
        renderItem={({ item, index }) => (
          <ListItem
            title={`${item.client_firstname}`}
            description={`${item.client_email}`}
            accessoryLeft={renderItemIcon}
          />
        )}
      />
    ) : null;
  }
}

const renderItemIcon = (props) => <Icon {...props} name="person" />;
const styles = StyleSheet.create({
  container: {
    height: "95%",
    width: "100%",
    position: "absolute",
  },
});

const mapStateToProps = (state) => {
  const { contacts } = state;
  return { contacts };
};

const mapDispatchToProps = { getContacts };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
