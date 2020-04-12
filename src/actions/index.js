import Request from "../Request/Request";
import { getTokens } from "../selector";
import { convertToObject } from "../selector/utils";
export const getMeta = () => ({
  types: ["META_REQUEST", "META_SUCCESS", "META_FAILURE"],
  callAPI: () => {
    return Request("https://api.goschedule.io/organization/meta")
      .get()
      .then((res) => {
        return res["data"];
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

export const toggleLogIn = (isLoggedIn) => {
  return {
    type: "LOGIN_SUCCESS",
    data: isLoggedIn,
  };
};

export const getContacts = (page) => ({
  types: ["GET_CONTACT_REQUEST", "GET_CONTACT_SUCCESS", "GET_CONTACT_FAILURE"],
  callAPI: (state) => {
    let tokens = getTokens(state);
    return Request("https://api.goschedule.io/customer/list/" + page, tokens)
      .get()
      .then((res) => {
        let { obj, ids } = convertToObject(
          res["data"].customers || [],
          "client_id"
        );
        return { obj, ids, entity: "contacts" };
      });
  },
});

export const updateContactUIState = (data) => {
  return {
    type: "UPDATE_CONTACTUI",
    data,
  };
};

export const getServices = () => ({
  types: ["GET_SERVICE_REQUEST", "GET_SERVICE_SUCCESS", "GET_SERVICE_FAILURE"],
  callAPI: (state) => {
    let tokens = getTokens(state);
    return Request(
      "https://api.goschedule.io/store/appointmentstore/list",
      tokens
    )
      .get()
      .then((res) => {
        let services = res["data"];
        return services || [];
      });
  },
});
