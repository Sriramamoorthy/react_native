import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

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
  return Dimensions.get("window").height * 0.85 - getStatusBarHeight();
};
