export const TEST = "TEST";

const Snackbar = {
  DISPLAYMESSAGE: "DISPLAYMESSAGE",
  DISMISSMESSAGE: "DISMISSMESSAGE"
};
// profile types
const profiletypes = {
  LOADPROFILE: "LOADPROFILE",
  SETPROFILEDATA: "SETPROFILEDATA",
  SAVEEDITEDPROFILEDATA: "SAVEEDITEDPROFILEDATA",
  SETOWNERSTATUS: "SETOWNERSTATUS",
  REMOVEPROFILELOADING: "REMOVEPROFILELOADING"
};
const notificationTypes = {
  GET_NOTIFICATIONS: "GET_NOTIFICATIONS"
};

const articleActions = {
  GET_ARTICLES: "GET_ARTICLES",
  SINGLE_ARTICLE: "SINGLE_ARTICLE",
  SET_LOADING: "SET_LOADING",
  REMOVE_LOADING: "REMOVE_LOADING",
  ADD_COUNT: "ADD_COUNT"
};

// comment actionTypes
const commentActions = {
  SET_COMMENTS: "SET_COMMENTS",
  CREATE_COMMENT: "CREATE_COMMENT",
  SET_LOADING_COMMENTS: "SET_LOADING_COMMENTS",
  REMOVE_LOADING_COMMENTS: "REMOVE_LOADING_COMMENTS",
  DELETE_COMMENT: "DELETE_COMMENT",
  EDIT_COMMENT: "EDIT_COMMENT",
  UPDATE_COMMENT_LIKES: "UPDATE_COMMENT_LIKES"
};

const tagActions = {
  TAGS: "TAGS"
};
const errorActions = {
  ERRORS: "ERRORS"
};
const likesDislike = {
  UPDATE_LIKES: "UPDATE_LIKES",
  REMOVE_LIKES: "REMOVE_LIKES"
};

const ratingTypes = {
  LOAD_RATING: "LOAD_RATING",
  GET_AVERAGE_RATING: "GET_AVERAGE_RATING",
  POST_RATING: "POST_RATING"
};

// search action types
const searchActions = {
  SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
  LOAD_SEARCH_RESULTS: "LOAD_SEARCH_RESULTS",
  FINISH_LOADING_SEARCH_RESULTS: "FINISH_LOADING_SEARCH_RESULTS"
};

const highlightTextComment = {
  HIGHLIGHT: "HIGHLIGHT",
  REMOVE_HIGHLIGHT: "REMOVE_HIGHLIGHT"
};

const highlightedCommentActions = {
  POST_HIGHLIGHTED_COMMENT: "POST_HIGHLIGHTED_COMMENT"
};

const showCommentBox = {
  SHOW_COMMENT_BOX: "SHOW_COMMENT_BOX",
  HIDE_COMMENT_BOX: "HIDE_COMMENT_BOX"
};

export default {
  ...Snackbar,
  ...articleActions,
  ...profiletypes,
  ...notificationTypes,
  ...articleActions,
  ...profiletypes,
  ...tagActions,
  ...errorActions,
  ...commentActions,
  ...likesDislike,
  ...ratingTypes,
  ...searchActions,
  ...highlightTextComment,
  ...highlightedCommentActions,
  ...showCommentBox
};
