import actionTypes from "../../actions/types";

const {
  SET_COMMENTS,
  CREATE_COMMENT,
  SET_LOADING_COMMENTS,
  REMOVE_LOADING_COMMENTS
} = actionTypes;
/**
 * The initial State of the comments reducer
 */
const initialState = {
  comments: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.payload };
    case CREATE_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case SET_LOADING_COMMENTS:
      return { ...state, isLoading: true };
    case REMOVE_LOADING_COMMENTS:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
