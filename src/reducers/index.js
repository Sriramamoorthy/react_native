export const orgData = (state = "", action) => {
  switch (action.type) {
    case "META_SUCCESS":
      let newState = Object.assign({}, state);
      newState = Object.assign({}, newState, action.data);
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

export const contacts = (state = {}, action) => {
  switch (action.type) {
    case "GET_CONTACT_SUCCESS":
      let newState = Object.assign({}, state);
      newState = Object.assign(newState, action.data.obj);
      return newState;
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
