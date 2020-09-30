import { getTokens } from "../selector";
import { convertToObject } from "../selector/utils";
import Request from "../Request/Request";

export const getUsers = () => ({
  types: ["GET_USERS_REQUEST", "GET_USERS_SUCCESS", "GET_USERS_FAILURE"],
  callAPI: (state) => {
    let tokens = getTokens(state);
    return Request("https://api.goschedule.io/users/list", tokens)
      .get()
      .then((res) => {
        let { obj, ids } = convertToObject(res["data"] || [], "user_id");
      console.log(obj);
        return { obj, ids, entity: "users" };
      });
  },
});

// export const getUser = (id) => ({
//   types: ["GET_USER_REQUEST", "GET_USER_SUCCESS", "GET_USER_FAILURE"],
//   callAPI: (state) => {
//     let tokens = getTokens(state);
//     return Request("https://api.goschedule.io/customer/" + id, tokens)
//       .get()
//       .then((res) => {
//         let obj = res["data"].customer;
//         let schedule = res["data"].schedule || [];
//         let contact = Object.assign(obj, { schedule: schedule });
//         return { obj: contact, id: contact.client_id };
//       });
//   },
// });

export const updateUserUIState = (data) => {
  return {
    type: "UPDATE_USERUISTATE",
    data,
  };
};

export const createUser = (payload) => ({
  types: ["CREATE_USER_REQUEST", "CREATE_USER_SUCCESS", "CREATE_USER_FAILURE"],
  callAPI: (state) => {
    let tokens = getTokens(state);
    return Request("https://api.goschedule.io/users/inviteuser", tokens)
      .post("", payload)
      .then((res) => {
        let obj = res["data"];
        return { obj, ids: [obj.user_id], entity: "users" };
      });
  },
});

export const updateUser = (id, payload) => ({
  types: ["UPDATE_USER_REQUEST", "UPDATE_USER_SUCCESS", "UPDATE_USER_FAILURE"],
  callAPI: (state) => {
    let tokens = getTokens(state);
    return Request("https://api.goschedule.io/users/updateuser/" + id, tokens)
      .post("", payload)
      .then((res) => {
        let obj = res["data"];
        return { obj, ids: [obj.user_id] };
      });
  },
});
