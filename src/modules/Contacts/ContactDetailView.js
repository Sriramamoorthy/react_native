import React from "react";
import { connect } from "react-redux";
import { getContacts, updateContactUIState } from "../../actions";
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

  componentDidMount() {}

  render() {
    let { selectedIndex } = this.state;

    const data = new Array(8).fill({
      title: "Item",
    });

    // const renderItemHeader = (headerProps, info) => (
    //   <View {...headerProps}>
    //     <Text style={{ marginLeft: 15 }}>
    //       {info.item.title} {info.index + 1}
    //     </Text>
    //   </View>
    // );

    // const renderItemFooter = (footerProps) => (
    //   <Text {...footerProps}>By Wikipedia</Text>
    // );

    // const renderItem = (info) => (
    //   <Card
    //     style={{ margin: 5 }}
    //     status="basic"
    //     header={(headerProps) => renderItemHeader(headerProps, info)}
    //     footer={renderItemFooter}
    //   >
    //     <Text>Lorem Ipsum is simply dummy text</Text>
    //   </Card>
    // );

    const renderItem = ({ item, index }) => (
      <React.Fragment>
        <ListItem
          title={`${item.title} ${index + 1}`}
          description={`${item.description} ${index + 1}`}
        />
      </React.Fragment>
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
            Contacts DetailView
          </Text>
        </Layout>
        <Layout style={styles.listContainer}>
          <Card>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Sriramamoorthy
              </Text>
              <Text>sriramamoorthys@gmail.com</Text>
              <Text>+91 8870508426</Text>
            </View>
          </Card>
          <TabBar selectedIndex={selectedIndex} onSelect={this.onSelectTab}>
            <Tab title="Bookings" />
            <Tab title="Upcoming" />
            <Tab title="Notes" />
          </TabBar>
          {selectedIndex === 0 ? (
            <Layout>
              <List data={data} renderItem={renderItem} />
            </Layout>
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

// const mapStateToProps = (state) => {
//   const { contacts } = state;
//   let contactIds = state.ids.contacts || [];
//   let contactArray = getContactArray(contacts, contactIds);
//   const { page, hasMoreData } = state.contactsUIState;
//   return {
//     contacts,
//     page,
//     hasMoreData,
//     contactIds: state.ids.contacts || [],
//     contactList: contactArray,
//   };
// };

// const mapDispatchToProps = { getContacts, updateContactUIState };

export default ContactDetailView;
