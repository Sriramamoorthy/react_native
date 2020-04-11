import React from "react";
import { connect } from "react-redux";
import { getContacts, updateContactUIState } from "../../actions";
import { getFullName } from "../../selector/utils";
import { StyleSheet, Dimensions } from "react-native";
import { ListItem, List, Icon, Divider, Button } from "@ui-kitten/components";
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      page: 0,
      apiLoading: false,
      hasMoreData: false,
    };
  }

  componentDidMount() {
    let { getContacts, updateContactUIState, hasMoreData, page } = this.props;
    if (hasMoreData) {
      getContacts(page)
        .then((data) => {
          updateContactUIState({
            page: ++page,
            hasMoreData: data["data"].length % 20 === 0,
          });
        })
        .catch();
    }
  }

  onScroll(e) {
    let { apiLoading } = this.state;
    let { getContacts, hasMoreData, page, updateContactUIState } = this.props;
    var windowHeight = Dimensions.get("window").height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height && !apiLoading && hasMoreData) {
      this.setState({ apiLoading: true, page: ++this.state.page });
      getContacts(page).then((data) => {
        updateContactUIState({
          page: ++page,
          hasMoreData: data["data"].length % 20 === 0,
        });
        this.setState({ apiLoading: false });
      });
    }
  }
  render() {
    const renderItemIcon = <Icon name="person" />;
    const renderItemAccessory = (props) => <Button size="tiny">FOLLOW</Button>;
    let { contacts } = this.props;

    const renderItem = ({ item, index }) => (
      <ListItem
        style={{ fontSize: 100 }}
        title={`${getFullName(item.client_firstname, item.client_lastname)}`}
        description={`${item.client_email} ${item.client_mobile || ""}`}
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
        onScroll={this.onScroll}
        scrollEventThrottle="80%"
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
  const { page, hasMoreData } = state.contactsUIState;
  return { contacts, page, hasMoreData };
};

const mapDispatchToProps = { getContacts, updateContactUIState };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
