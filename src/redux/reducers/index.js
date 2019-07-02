import { combineReducers } from "redux";

import MessageReducer from "./SnackBarReducer";
import userProfile from "./userProfile/userProfile";

export default combineReducers({
  toasts: MessageReducer,
  profile: userProfile
});
