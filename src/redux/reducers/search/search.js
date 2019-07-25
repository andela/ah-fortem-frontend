import actionTypes from "../../actions/types";

const {
  SET_SEARCH_RESULTS,
  LOAD_SEARCH_RESULTS,
  FINISH_LOADING_SEARCH_RESULTS
} = actionTypes;

const initialState = {
  searchResults: {
    articles: [],
    count: 0,
    links: {}
  },
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case LOAD_SEARCH_RESULTS:
      return { ...state, isLoading: true };
    case FINISH_LOADING_SEARCH_RESULTS:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
