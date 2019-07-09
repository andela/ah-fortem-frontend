import { combineReducers } from "redux";
import MessageReducer from "./SnackBarReducer";
import userProfile from "./userProfile/userProfile";
import notifications from "./notifications";

export default combineReducers({
  profile: userProfile,
  toasts: MessageReducer,
  notifications: notifications
});
