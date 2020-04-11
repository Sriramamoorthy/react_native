import React from "react";
import { connect } from "react-redux";
import { getContacts } from "../../actions";
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
    let { getContacts } = this.props;
    let { page } = this.state;
    getContacts(page)
      .then((data) => {
        if (data["data"].length % 20 === 0) {
          this.setState({ hasMoreData: true });
        } else {
          this.setState({ hasMoreData: false });
        }
      })
      .catch();
  }

  onScroll(e) {
    let { apiLoading, hasMoreData, page } = this.state;
    let { getContacts } = this.props;
    var windowHeight = Dimensions.get("window").height,
      height = e.nativeEvent.contentSize.height,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height && !apiLoading && hasMoreData) {
      this.setState({ apiLoading: true, page: ++this.state.page });
      getContacts(this.state.page).then((data) => {
        if (data["data"].length % 20 === 0) {
          this.setState({ hasMoreData: true });
        } else {
          this.setState({ hasMoreData: false });
        }
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
  return { contacts };
};

const mapDispatchToProps = { getContacts };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
