import Request from "../Request/Request";
import { getTokens } from "../selector";
export const getMeta = () => ({
  types: ["META_REQUEST", "META_SUCCESS", "META_FAILURE"],
  callAPI: () => {
    return Request("https://api.goschedule.io/organization/meta")
      .get()
      .then((res) => {
        return res["data"];
      })
      .catch((err) => {
        return err;
      });
  },
});

export const onLoginIn = (loginObj) => ({
  types: ["LOGIN_REQUEST", "LOGIN_SUCCESS", "LOGIN_FAILURE"],
  callAPI: () => {
    return Request("https://api.goschedule.io/accounts/signin")
      .post(loginObj)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  },
});

export const toggleLogIn = () => {
  return {
    type: "LOGIN_SUCCESS",
    data: true,
  };
};

export const getContacts = () => ({
  types: ["GET_CONTACT_REQUEST", "GET_CONTACT_SUCCESS", "GET_CONTACT_FAILURE"],
  callAPI: (state) => {
    let tokens = getTokens(state);
    return Request("https://api.goschedule.io/customer/list/0", tokens)
      .get()
      .then((res) => {
        return res["data"].customers || [];
      });
  },
});
