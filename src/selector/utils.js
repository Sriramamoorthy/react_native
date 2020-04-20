import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const convertToObject = (arrayObj, key) => {
  let length = arrayObj.length;
  let newObj = {};
  let ids = [];
  for (let i = 0; i < length; i++) {
    Object.assign(newObj, { [arrayObj[i][key || "id"]]: arrayObj[i] });
    ids.push(arrayObj[i][key || "id"]);
  }
  return { obj: newObj, ids: ids };
};

export const getFullName = (first_name = "", last_name = "") => {
  let name = "";
  name = first_name ? first_name + " " : "";
  name += last_name;
  return name ? name : "-";
};

export const getHeaderHeight = () => {
  return Dimensions.get("window").height * 0.07;
};

export const getContainerHeight = () => {
  return Dimensions.get("window").height * 0.97 - getStatusBarHeight();
};

export const getInnerContainerHeight = () => {
  return (
    Dimensions.get("window").height * 0.97 -
    Dimensions.get("window").height * 0.05 -
    getHeaderHeight() -
    getStatusBarHeight()
  );
};

export const getContactArray = (contacts, ids) => {
  let contactList = [];
  ids.map((id) => {
    contactList.push(contacts[id]);
  });
  return contactList;
};

export const getUserArray = (users, ids) => {
  let userList = [];
  ids.map((id) => {
    userList.push(users[id]);
  });
  return userList;
};
