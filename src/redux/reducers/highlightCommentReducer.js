import actionTypes from "../actions/types";
const { HIGHLIGHT } = actionTypes;

export default (state = {}, action) => {
  switch (action.type) {
    case HIGHLIGHT:
      return action.payload;
    default:
      return state;
  }
};
