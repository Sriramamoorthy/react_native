import React from "react";
import { connect } from "react-redux";
import { getContact, updateContactUIState } from "../../actions";
import {
  getFullName,
  getHeaderHeight,
  getInnerContainerHeight,
  getContactArray,
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
class ContactDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.onSelectTab = this.onSelectTab.bind(this);
  }

  onSelectTab(index) {
    this.setState({ selectedIndex: index });
  }

  componentDidMount() {
    let { id, getContact } = this.props;
    getContact(id).then();
  }

  render() {
    let { selectedIndex } = this.state;
    let {
      client_firstname,
      client_lastname,
      client_email = "",
      client_phone = "",
      internal_notes = "",
    } = this.props.contact;
    let { onClickBack, schedule } = this.props;
    let fullName = getFullName(client_firstname, client_lastname);

    const data = new Array(8).fill({
      title: "Item",
    });

    const renderItemHeader = (headerProps, info) => (
      <View {...headerProps}>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "bold",
            padding: 10,
            textTransform: "capitalize",
          }}
        >
          {info.item.status}
        </Text>
      </View>
    );

    const renderItem = (info) => (
      <Card
        style={{ margin: 5 }}
        status="basic"
        header={(headerProps) => renderItemHeader(headerProps, info)}
      >
        <Text>{info.item.appmt_service_entity.service_name}</Text>
        <Text>16 June 2021, 10:00 AM</Text>
      </Card>
    );

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
            Contacts DetailView
          </Text>
        </Layout>
        <Layout style={styles.listContainer}>
          <Card>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {fullName}
              </Text>
              <Text>{client_email}</Text>
              <Text>{client_phone}</Text>
            </View>
          </Card>
          <TabBar selectedIndex={selectedIndex} onSelect={this.onSelectTab}>
            <Tab title="Bookings" />
            <Tab title="Upcoming" />
            <Tab title="Notes" />
          </TabBar>
          {selectedIndex === 0 ? (
            <Layout>
              <List data={schedule} renderItem={renderItem} />
            </Layout>
          ) : selectedIndex === 2 ? (
            <Text>{internal_notes}</Text>
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

const mapStateToProps = (state, props) => {
  let contactId = props.id;
  let contact = state.contacts[contactId];
  return {
    contact,
    schedule: contact.schedule || [],
  };
};

const mapDispatchToProps = { getContact, updateContactUIState };

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailView);
