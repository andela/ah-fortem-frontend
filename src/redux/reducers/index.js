import { combineReducers } from "redux";

import articles from "./ArticlesReducer";
import MessageReducer from "./SnackBarReducer";
import userProfile from "./userProfile/userProfile";
import notifications from "./notifications";

export default combineReducers({
  profile: userProfile,
  toasts: MessageReducer,
  notifications: notifications,
  articles
});
