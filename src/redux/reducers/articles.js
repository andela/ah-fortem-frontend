import actionTypes from "../actions/types";

const initialState = {
  articles: [],
  article: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES:
      return { ...state, articles: action.payload };
    case actionTypes.SINGLE_ARTICLE:
      return { ...state, article: action.payload };
    case actionTypes.POST_ARTICLE:
      return action.payload;
    case actionTypes.UPDATE_ARTICLE:
      return action.payload;
    default:
      return state;
  }
};
