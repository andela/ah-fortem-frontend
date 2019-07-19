import { combineReducers } from "redux";

import articles from "./ArticlesReducer";
import MessageReducer from "./SnackBarReducer";
import userProfile from "./userProfile/userProfile";
import notifications from "./notifications";
import tags from "./tagsReducer";
import { CommentsReducer } from "./comments";
import ratings from "./ratingReducer";

export default combineReducers({
  toasts: MessageReducer,
  notifications: notifications,
  profile: userProfile,
  tags,
  articles,
  comments: CommentsReducer,
  ratings
});
