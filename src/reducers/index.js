export const orgData = (state = "", action) => {
  switch (action.type) {
    case "META_SUCCESS":
      let newState = Object.assign({}, state);
      newState = Object.assign({}, newState, action.data);
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.data;
    default:
      return state;
  }
};

export const contactsUIState = (
  state = { page: 0, hasMoreData: true },
  action
) => {
  switch (action.type) {
    case "UPDATE_CONTACTUI":
      return action.data;
    default:
      return state;
  }
};

export const userUIState = (state = { hasMoreData: true }, action) => {
  switch (action.type) {
    case "UPDATE_USERUISTATE":
      return action.data;
    default:
      return state;
  }
};

export const contacts = (state = {}, action) => {
  switch (action.type) {
    case "GET_CONTACTS_SUCCESS":
      let newState = Object.assign({}, state);
      newState = Object.assign(newState, action.data.obj);
      return newState;
    case "GET_CONTACT_SUCCESS":
      let nState = Object.assign({}, state);
      nState = Object.assign({}, nState, { [action.data.id]: action.data.obj });
      return nState;
    case "CREATE_CONTACT_SUCCESS":
    case "UPDATE_CONTACT_SUCCESS":
      let mState = Object.assign({}, state);
      mState = Object.assign({}, mState, {
        [action.data.ids[0]]: action.data.obj,
      });
      return mState;
    default:
      return state;
  }
};

export const users = (state = {}, action) => {
  switch (action.type) {
    case "GET_USERS_SUCCESS":
      let newState = Object.assign({}, state);
      newState = Object.assign(newState, action.data.obj);
      return newState;
    case "GET_USER_SUCCESS":
      let nState = Object.assign({}, state);
      nState = Object.assign({}, nState, { [action.data.id]: action.data.obj });
      return nState;
    case "CREATE_USER_SUCCESS":
    case "UPDATE_USER_SUCCESS":
      let mState = Object.assign({}, state);
      mState = Object.assign({}, mState, {
        [action.data.ids[0]]: action.data.obj,
      });
      return mState;
    default:
      return state;
  }
};

export const services = (state = [], action) => {
  switch (action.type) {
    case "GET_SERVICE_SUCCESS":
      return action.data;
    default:
      return state;
  }
};

export const ids = (state = {}, action) => {
  if (action.type.indexOf("_SUCCESS")) {
    let newState = Object.assign({}, state);
    if (action.data && action.data.entity) {
      let modules = newState[action.data.entity] || [];
      modules = [...modules, ...action.data.ids];
      // Object.assign(module, { [action.data.entity]: action.data.ids || [] });
      return Object.assign(newState, {
        [action.data.entity]: modules,
      });
    }
  }
  return state;
};
