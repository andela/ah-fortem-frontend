import actionTypes from "../actions/types";
const { TAGS } = actionTypes;
export default function tagReducer(state = [], action) {
  switch (action.type) {
    case TAGS:
      return action.tags;
    default:
      return state;
  }
}
