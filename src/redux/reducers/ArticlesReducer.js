import articleActions from "../actions/types";

const initialState = {
  articles: [],
  article: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case articleActions.GET_ARTICLES:
      return { ...state, articles: action.payload };
    case articleActions.SINGLE_ARTICLE:
      return { ...state, article: action.payload };
    default:
      return state;
  }
};
