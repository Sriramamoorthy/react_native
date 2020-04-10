import React from "react";
import { connect } from "react-redux";
import { getContacts } from "../../actions";
import { StyleSheet } from "react-native";
import { ListItem, List, Icon, Divider, Button } from "@ui-kitten/components";
class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { getContacts } = this.props;
    getContacts().then().catch();
  }

  render() {
    const renderItemIcon = <Icon name="person" />;
    const renderItemAccessory = (props) => <Button size="tiny">FOLLOW</Button>;
    let { contacts } = this.props;

    const renderItem = ({ item, index }) => (
      <ListItem
        style={{ fontSize: 100 }}
        title={`${item.client_firstname}`}
        description={`${item.client_email}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory}
      />
    );

    return contacts.length ? (
      <List
        style={styles.container}
        data={contacts}
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

const mapStateToProps = (state) => {
  const { contacts } = state;
  return { contacts };
};

const mapDispatchToProps = { getContacts };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
