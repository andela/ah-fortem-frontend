import { apiCalls } from "../../../Helpers/axios";
import { ShowMessage } from "../SnackBarAction";

import actionTypes from "../types";

const {
  SET_SEARCH_RESULTS,
  LOAD_SEARCH_RESULTS,
  FINISH_LOADING_SEARCH_RESULTS
} = actionTypes;

/**
 *
 * @param {Function} dispatch - redux dispatch
 */
const onFetchError = dispatch => {
  return dispatch(
    ShowMessage({
      message: "Failed to load the search results, Please try again",
      type: "error"
    })
  );
};
/**
 * @description - this function fetches the search results
 * @param {String} url - the url of the search query
 * @param {Function} dispatch - redux function
 */
export const fetchArticlesToBeSearched = (url, callback) => dispatch => {
  dispatch({
    type: LOAD_SEARCH_RESULTS
  });
  return apiCalls("get", url)
    .then(({ data }) => {
      dispatch({
        type: SET_SEARCH_RESULTS,
        payload: data
      });

      dispatch({
        type: FINISH_LOADING_SEARCH_RESULTS
      });
    })
    .catch(() => {
      onFetchError(dispatch);
      callback && callback();
    });
};
