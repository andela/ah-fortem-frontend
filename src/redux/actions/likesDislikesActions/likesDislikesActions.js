import types from "../types";
import { apiCalls, deleteCalls } from "../../../Helpers/axios";
import { ShowMessage } from "../SnackBarAction";

const { UPDATE_LIKES } = types;
const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json"
};
export const handleErors = (response, dispatch) => {
  const { status, data } = response;
  if (status < 300) {
    dispatch({
      type: UPDATE_LIKES,
      payload: data
    });
  } else if (status === 403) {
    dispatch(
      ShowMessage({
        message: "Login to Like/dislike this article",
        type: "error"
      })
    );
  } else {
    dispatch(
      ShowMessage({
        message: "Something went try reloading the page",
        type: "error"
      })
    );
  }
};
export const getLikes = slug => dispatch => {
  const url = `/articles/${slug}/likes/count`;
  return apiCalls("get", url, { headers })
    .then(response => {
      handleErors(response, dispatch);
    })
    .catch(err => {
      const { response } = err;
      handleErors(response);
    });
};

export const postLikes = (data, slug) => dispatch => {
  const url = `/articles/${slug}/likes/`;

  return apiCalls("post", url, data, headers)
    .then(response => {
      handleErors(response, dispatch);
    })
    .catch(err => {
      const { response } = err;
      handleErors(response, dispatch);
    });
};

export const deleteLikes = slug => dispatch => {
  const url = `/articles/${slug}/likes/`;

  return deleteCalls("delete", url, localStorage.getItem("token")).then(
    response => {
      handleErors(response, dispatch);
    }
  );
};
