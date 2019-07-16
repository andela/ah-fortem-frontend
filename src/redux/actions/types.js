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
  REMOVE_LOADING: "REMOVE_LOADING"
};

// comment actionTypes
const commentActions = {
  SET_COMMENTS: "SET_COMMENTS",
  CREATE_COMMENT: "CREATE_COMMENT",
  SET_LOADING_COMMENTS: "SET_LOADING_COMMENTS",
  REMOVE_LOADING_COMMENTS: "REMOVE_LOADING_COMMENTS"
};

const tagActions = {
  TAGS: "TAGS"
};
const errorActions = {
  ERRORS: "ERRORS"
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
  ...commentActions
};
