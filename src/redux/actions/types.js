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
  ...errorActions
};
