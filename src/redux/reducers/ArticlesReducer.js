import articleActions from "../actions/types";

const initialState = {
  articles: [],
  article: null,
  count: null,
  loadingArticles: false,
  likesCount: {
    likes: 0,
    dislikes: 0,
    total: 0
  }
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
    case articleActions.ADD_COUNT:
      return { ...state, count: action.payload };
    case articleActions.UPDATE_LIKES:
      return { ...state, likesCount: action.payload };
    default:
      return state;
  }
};
