import { combineReducers } from "redux";

import MessageReducer from "./SnackBarReducer";

export default combineReducers({
  toasts: MessageReducer
});
