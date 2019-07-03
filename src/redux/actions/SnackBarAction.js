import types from "./types";
const { DISPLAYMESSAGE, DISMISSMESSAGE } = types;

export const ShowMessage = message => dispatch => {
  let msg = typeof message === "string" ? { message } : message;

  if (!msg.type) {
    msg.type = "success";
  }
  return dispatch({
    type: DISPLAYMESSAGE,
    payload: { ...msg }
  });
};
export const DismissMessage = id => dispatch => {
  return dispatch({
    type: DISMISSMESSAGE,
    payload: id
  });
};
