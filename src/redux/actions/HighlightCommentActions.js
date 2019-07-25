import actionTypes from "./types";
const { HIGHLIGHT, SHOW_COMMENT_BOX, HIDE_COMMENT_BOX } = actionTypes;

export const highlightText = data => dispatch => {
  return dispatch({
    type: HIGHLIGHT,
    payload: data
  });
};

export const showCommentBox = data => dispatch => {
  return dispatch({
    type: SHOW_COMMENT_BOX,
    payload: data
  });
};

export const hideCommentBox = data => dispatch => {
  return dispatch({
    type: HIDE_COMMENT_BOX,
    payload: data
  });
};
