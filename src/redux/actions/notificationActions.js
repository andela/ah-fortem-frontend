import actionTypes from "./types";

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
