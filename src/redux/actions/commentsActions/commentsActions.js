import actionTypes from "../types";

import { apiCalls } from "../../../Helpers/axios";

import { ShowMessage } from "../SnackBarAction";

/**
 * this remaning of imports has been done because
 * code climate raised an issue of duplicate imports
 * in this file and the commentsreducer file
 */
const {
  CREATE_COMMENT: COMMENT_CREATION,
  SET_COMMENTS: SET_LIST_OF_COMMENTS,
  SET_LOADING_COMMENTS: LOADING_COMMENTS,
  REMOVE_LOADING_COMMENTS: COMPLETE_LOADING_COMMENTS,
  DELETE_COMMENT: DELETE_SINGLE_COMMENT,
  EDIT_COMMENT: EDIT_SINGLE_COMMENT
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
      type: COMMENT_CREATION,
      payload: data
    });
  });
};

/**
 *
 * @param {fn} dispatch redux fn
 * @param {Array} Comments - array of comments
 */
const handleGettingCommentsSuccessfully = (dispatch, Comments) => {
  dispatch({
    type: SET_LIST_OF_COMMENTS,
    payload: Comments
  });
  dispatch({
    type: COMPLETE_LOADING_COMMENTS
  });
};

/**
 *
 * @param {string} articleSlug - the slug for the article which we are getting comments from
 * @param {Fn} failureCallback - this function is called when comments cannot be called successfully
 * @returns {Promise} - returns Promise<Resolve | Reject>
 */
export const getArticleComments = (
  articleSlug,
  failureCallback
) => dispatch => {
  dispatch({
    type: LOADING_COMMENTS
  });

  //set comments to an empty array before fetching
  dispatch({
    type: SET_LIST_OF_COMMENTS,
    payload: []
  });
  return apiCalls("get", `/articles/${articleSlug}/comments`, {
    headers: {
      ...authHeaders
    }
  })
    .then(({ data: { Comments = [] } }) => {
      handleGettingCommentsSuccessfully(dispatch, Comments);
    })
    .catch(() => {
      dispatch({
        type: COMPLETE_LOADING_COMMENTS
      });
      failureCallback();
    });
};

/**
 *  This function checks if the currently
 * logged in user is the owner of the comment that has been written
 * @param {object} comment - a single comment object
 */
export const isUserCommentOwner = comment =>
  localStorage.getItem("username") === comment.user.username;

/**
 * This function takes care of deleting a comment from the database
 * @param {String} articleSlug - the slug of the article
 * @param {Int} commentId - the id of the comment
 * @returns {Promise} - Promise<Resolve | Reject>
 */
export const deleteComment = (articleSlug, commentId) => dispatch => {
  return apiCalls("delete", `/articles/${articleSlug}/comments/${commentId}`, {
    headers: {
      ...authHeaders
    }
  }).then(() => {
    dispatch({
      type: DELETE_SINGLE_COMMENT,
      payload: commentId
    });
  });
};

/**
 * this method is called when an error occurs in
 * the editComponent function
 * @param {function} dispatch - redux dispatch
 */
const handleEditComponentError = dispatch =>
  dispatch(
    ShowMessage({
      message: "Could not update the comment, kindly try again",
      type: "error"
    })
  );

/**
 * This function is clled when a comment is successfully updated
 * @param {Function} dispatch - redux fn
 * @param {Int} id - the comment id
 * @param {String} body - the new body of the comment
 */
const handleEditComponentSuccess = (dispatch, id, body) =>
  dispatch({
    type: EDIT_SINGLE_COMMENT,
    payload: {
      id,
      body
    }
  });

/**
 * handles updating the comment in the API.
 * @param {String} article - the article slug
 * @param {Int} id - the comment id
 * @param {String} body - the updated comment string
 */
export const editComment = (article, id, body) => dispatch => {
  return apiCalls(
    "put",
    `/articles/${article}/comments/${id}`,
    {
      comment: {
        body
      }
    },
    {
      ...authHeaders
    }
  )
    .then(() => {
      handleEditComponentSuccess(dispatch, id, body);
      dispatch(ShowMessage("Successfully updated your comment"));
    })
    .catch(() => {
      handleEditComponentError(dispatch);
    });
};
