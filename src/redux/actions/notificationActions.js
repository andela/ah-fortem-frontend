import actionTypes from "./types";
import { apiCalls, deleteCalls } from "../../Helpers/axios";
import { ShowMessage } from "./SnackBarAction";

export const fetchNotifications = url => dispatch => {
  const ws = new WebSocket(url);

  ws.onmessage = evt => {
    const received_msg = JSON.parse(evt.data);
    dispatch({
      type: actionTypes.GET_NOTIFICATIONS,
      payload: received_msg
    });
  };
};

const dispatchSuccessShowMessage = (dispatch, data) => {
  dispatch(
    ShowMessage({
      message: data.data.data,
      type: "success"
    })
  );
};

const dispatchErrorShowMessage = (dispatch, error) => {
  dispatch(
    ShowMessage({
      message: error,
      type: "error"
    })
  );
};
const message =
  "Oops something went wrong! Kindly try again or reload the page";

export const optIn = (token, type) => dispatch => {
  const url = "/subscription/" + type + "/";

  return apiCalls(
    "post",
    url,
    {},
    {
      Authorization: `Bearer ` + token
    }
  )
    .then(data => {
      dispatchSuccessShowMessage(dispatch, data);
    })
    .catch(error => {
      dispatchErrorShowMessage(dispatch, message);
    });
};

export const optOut = (token, type) => dispatch => {
  const url = "/subscription/" + type + "/";

  return deleteCalls("delete", url, token)
    .then(data => {
      dispatchSuccessShowMessage(dispatch, data);
    })
    .catch(error => {
      dispatchErrorShowMessage(dispatch, message);
    });
};
