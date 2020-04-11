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

export const getServices = () => ({
  types: ["GET_SERVICE_REQUEST", "GET_SERVICE_SUCCESS", "GET_SERVICE_FAILURE"],
  callAPI: (state) => {
    let tokens = getTokens(state);
    return Request("https://api.goschedule.io/store/appointmentstore/list", tokens)
      .get()
      .then((res) => {
        let services = res['data']
        return services || [];
      });
  },
});
