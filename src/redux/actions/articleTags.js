import actionTypes from "./types";
import { apiCalls } from "../../Helpers/axios";
import { ShowMessage } from "./SnackBarAction";
const { TAGS } = actionTypes;
export const setTags = tags => {
  return {
    type: TAGS,
    tags
  };
};

export const fetchTags = () => {
  return dispatch =>
    apiCalls("get", "/tags")
      .then(res => {
        return res.data;
      })
      .then(data => {
        dispatch(setTags(data.tags));
      })
      .catch(() => {
        dispatch(
          ShowMessage({
            message: "Oops Tags not found. API Server error.",
            type: "error"
          })
        );
      });
};
