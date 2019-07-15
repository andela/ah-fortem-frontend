import actionTypes from "../types";

import { apiCalls } from "../../../Helpers/axios";

const {
  CREATE_COMMENT,
  SET_COMMENTS,
  SET_LOADING_COMMENTS,
  REMOVE_LOADING_COMMENTS
} = actionTypes;

const authHeaders = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

/**
 * This function creates a comment
 * @param {String} articleSlug - the slug of the article
 * @param {Object} comment - the comments object
 * @returns {Promise} - returns Promise<Resolve | Reject>
 */
export const createComment = (articleSlug, comment) => dispatch => {
  return apiCalls(
    "post",
    `/articles/${articleSlug}/comments`,
    {
      comment
    },
    { ...authHeaders }
  ).then(({ data }) => {
    dispatch({
      type: CREATE_COMMENT,
      payload: data
    });
  });
};

/**
 *
 * @param {string} articleSlug - the slug for the article which we are getting comments from
 * @returns {Promise} - returns Promise<Resolve | Reject>
 */
export const getArticleComments = articleSlug => dispatch => {
  dispatch({
    type: SET_LOADING_COMMENTS
  });

  //set comments to an empty array before fetching
  dispatch({
    type: SET_COMMENTS,
    payload: []
  });
  return apiCalls("get", `/articles/${articleSlug}/comments`, {
    headers: {
      ...authHeaders
    }
  }).then(({ data: { Comments = [] } }) => {
    dispatch({
      type: SET_COMMENTS,
      payload: Comments
    });
    dispatch({
      type: REMOVE_LOADING_COMMENTS
    });
  });
};
