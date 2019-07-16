import actions from "./types";
import { apiCalls } from "../../Helpers/axios";
import { ShowMessage } from "./SnackBarAction";

const dispatchPostRating = (dispatch, data) => {
  dispatch({
    type: actions.POST_RATING,
    payload: data.data.rating
  });
};

export const setRating = (id, data, token, title) => dispatch => {
  const url = "/articles/" + id + "/rating/";

  return apiCalls("post", url, data, {
    Authorization: `Bearer ` + token
  })
    .then(data => {
      dispatchPostRating(dispatch, data);

      const rating = parseInt(data.data.rating, 10).toFixed(1);
      dispatch(
        ShowMessage({
          message: "You rated " + title + " with star rating of " + rating,
          type: "success"
        })
      );
    })
    .catch(error => {
      dispatch(
        ShowMessage({
          message: "Oops rate error" + error,
          type: "error"
        })
      );
    });
};

export const getRating = (id, token) => dispatch => {
  const url = "/articles/" + id + "/rating/";
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  };
  return apiCalls("get", url, { headers })
    .then(data => {
      dispatchPostRating(dispatch, data);
    })
    .catch(error => {
      dispatch(
        ShowMessage({
          message: "Oops rate error" + error,
          type: "error"
        })
      );
    });
};
