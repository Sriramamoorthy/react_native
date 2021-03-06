import React from "react";
import { connect } from "react-redux";
import { getContacts, updateContactUIState } from "../../actions";
import {
  getFullName,
  getHeaderHeight,
  getInnerContainerHeight,
  getContactArray,
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
class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.onClickContact = this.onClickContact.bind(this);
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
        .then((res) => {
          updateContactUIState({
            page: ++page,
            hasMoreData: res.data["ids"].length % 20 === 0,
          });
        })
        .catch();
    }
  }

  onClickContact(id) {
    let { onClickContact } = this.props;
    onClickContact && onClickContact(id);
  }

  onScroll(e) {
    let { apiLoading } = this.state;
    let { getContacts, hasMoreData, page, updateContactUIState } = this.props;
    var windowHeight = Dimensions.get("window").height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height && !apiLoading && hasMoreData) {
      this.setState({ apiLoading: true, page: ++this.state.page });
      getContacts(page).then((res) => {
        updateContactUIState({
          page: ++page,
          hasMoreData: res.data["ids"].length % 20 === 0,
        });
        this.setState({ apiLoading: false });
      });
    }
  }
  render() {
    const renderItemIcon = <Icon name="person" />;
    let { onClickAdd, contactList } = this.props;

    const renderItem = ({ item, index }) => (
      <ListItem
        style={{ fontSize: 100 }}
        title={`${getFullName(item.client_firstname, item.client_lastname)}`}
        description={`${item.client_email} ${item.client_mobile || ""}`}
        accessoryLeft={renderItemIcon}
        onPress={this.onClickContact.bind(this, item.client_id)}
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
            Contacts
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
          {contactList.length ? (
            <List
              style={styles.container}
              data={contactList}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
              onScroll={this.onScroll}
              scrollEventThrottle="80%"
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
  const { contacts } = state;
  let contactIds = state.ids.contacts || [];
  let contactArray = getContactArray(contacts, contactIds);
  const { page, hasMoreData } = state.contactsUIState;
  return {
    contacts,
    page,
    hasMoreData,
    contactIds: state.ids.contacts || [],
    contactList: contactArray,
  };
};

const mapDispatchToProps = { getContacts, updateContactUIState };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
