import types from "../types";
import { apiCalls, deleteCalls } from "../../../Helpers/axios";

const { UPDATE_COMMENT_LIKES } = types;

const token = localStorage.getItem("token");

const dispatcher = ({ dispatch, id, data = null, type = null }) => {
  return dispatch({
    type: UPDATE_COMMENT_LIKES,
    payload: { id, data, type }
  });
};

export const postCommentLikes = (data, id) => dispatch => {
  const url = `/comments/${id}/like`;

  return apiCalls("post", url, data, { Authorization: `Bearer ${token}` }).then(
    res => {
      dispatcher({ dispatch, id, data: res });
    }
  );
};

export const deleteCommentLike = (id, type) => dispatch => {
  const url = `/comments/${id}/like`;

  return deleteCalls("delete", url, token).then(data => {
    dispatcher({ dispatch, id, type });
  });
};
