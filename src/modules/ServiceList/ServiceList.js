import React from "react";
import { connect } from "react-redux";
import { getServices } from "../../actions";
import { StyleSheet } from "react-native";
import { ListItem, List, Icon, Divider, Button } from "@ui-kitten/components";
class ServiceList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { getServices } = this.props;
    getServices().then().catch();
  }

  render() {
    const renderItemIcon = <Icon name="person" />;
    const renderItemAccessory = (props) => <Button size="tiny">FOLLOW</Button>;
    let { services } = this.props;

    const renderItem = ({ item, index }) => (
      <ListItem
        title={`${item.service_name}`}
        description={`${item.service_description}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory}
      />
    );

    return services.length ? (
      <List
        style={styles.container}
        data={services}
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
  const { services } = state;
  return { services };
};

const mapDispatchToProps = { getServices };

export default connect(mapStateToProps, mapDispatchToProps)(ServiceList);
