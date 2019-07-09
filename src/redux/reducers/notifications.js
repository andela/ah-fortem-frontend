import actionTypes from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_NOTIFICATIONS:
      return [...state, action.payload];
    default:
      return state;
  }
};
