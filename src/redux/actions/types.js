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

const types = {
  ...profiletypes,
  ...Snackbar,
  ...notificationTypes
};

export default types;
