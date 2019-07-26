import actionTypes from "../actions/types";
const { SHOW_COMMENT_BOX, HIDE_COMMENT_BOX } = actionTypes;

export default (state = { display: "none" }, action) => {
  switch (action.type) {
    case SHOW_COMMENT_BOX:
      return action.payload;
    case HIDE_COMMENT_BOX:
      return action.payload;
    default:
      return state;
  }
};
