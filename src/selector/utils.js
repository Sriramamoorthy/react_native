export const getFullName = (first_name = "", last_name = "") => {
  let name = "";
  name = first_name ? first_name + " " : "";
  name += last_name;
  return name ? name : "-";
};
