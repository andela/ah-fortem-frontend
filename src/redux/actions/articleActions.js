import articleActions from "./types";
import { apiCalls, deleteCalls } from "../../Helpers/axios";
import { ShowMessage } from "../../redux/actions/SnackBarAction";

export const getArticles = () => dispatch => {
  const url = "/articles";
  return apiCalls("get", url)
    .then(data => {
      dispatch({
        type: articleActions.GET_ARTICLES,
        payload: data.data.articles
      });
    })
    .catch(() => {
      dispatch(
        ShowMessage({
          message: "Oops! server error please reload the page",
          type: "error"
        })
      );
    });
};

export const viewArticle = slug => dispatch => {
  const url = "/articles/" + slug;
  dispatch({
    type: articleActions.SINGLE_ARTICLE,
    payload: null
  });
  return apiCalls("get", url).then(data => {
    dispatch({
      type: articleActions.SINGLE_ARTICLE,
      payload: data.data.article
    });
  });
};

export const postArticle = (data, token) => dispatch => {
  const url = "/articles";

  return apiCalls("post", url, data, {
    Authorization: `Bearer ` + token
  }).then(data => {
    dispatch({
      type: articleActions.SINGLE_ARTICLE,
      payload: data.data.article
    });
    return data.data.article;
  });
};

export const updateArticle = (slug, data, token) => dispatch => {
  const url = "/articles/" + slug;

  return apiCalls("put", url, data, {
    Authorization: `Bearer ` + token
  }).then(data => {
    dispatch({
      type: articleActions.SINGLE_ARTICLE,
      payload: data.data.article
    });
    return data.data.article;
  });
};

export const deleteArticle = (slug, token) => dispatch => {
  const url = "/articles/" + slug;

  return deleteCalls("delete", url, token).then(data => {
    return data;
  });
};
