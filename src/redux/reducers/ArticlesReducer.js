import articleActions from "../actions/types";

const initialState = {
  articles: [],
  article: null,
  loadingArticles: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case articleActions.GET_ARTICLES:
      return { ...state, articles: action.payload };
    case articleActions.SINGLE_ARTICLE:
      return { ...state, article: action.payload };
    case articleActions.SET_LOADING:
      return { ...state, loadingArticles: true };
    case articleActions.REMOVE_LOADING:
      return { ...state, loadingArticles: false };
    default:
      return state;
  }
};
