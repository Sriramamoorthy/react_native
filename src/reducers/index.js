const INITIAL_STATE = {
  current: [],
  possible: ["Allie", "Gator", "Lizzie", "Reptar"],
};

export const friendReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "META_SUCCESS":
      return "sriram";
      break;
    default:
      return state;
  }
};
