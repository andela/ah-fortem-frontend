import { combineReducers } from "redux";

import articles from "./ArticlesReducer";
import MessageReducer from "./SnackBarReducer";
import userProfile from "./userProfile/userProfile";
import notifications from "./notifications";
import tags from "./tagsReducer";

export default combineReducers({
  toasts: MessageReducer,
  notifications: notifications,
  profile: userProfile,
  tags,
  articles
});
