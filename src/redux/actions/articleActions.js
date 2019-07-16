import articleActions from "./types";
import { apiCalls, deleteCalls } from "../../Helpers/axios";
import { ShowMessage } from "./SnackBarAction";

const dispatchSetArticles = (dispatch, data) => {
  dispatch({
    type: articleActions.GET_ARTICLES,
    payload: data.data.articles
  });
  dispatch({
    type: articleActions.REMOVE_LOADING
  });
};

const articleCount = (dispatch, data) => {
  dispatch({
    type: articleActions.ADD_COUNT,
    payload: data.data.count
  });
};
export const getArticles = (page = 1) => dispatch => {
  const url = "/articles?page=" + page;
  dispatch({
    type: articleActions.SET_LOADING
  });
  return apiCalls("get", url).then(data => {
    articleCount(dispatch, data);
    dispatchSetArticles(dispatch, data);
  });
};

export const getArticlesByTags = tag => dispatch => {
  const url = "/articles?tag=" + tag;
  dispatch({
    type: articleActions.SET_LOADING
  });
  return apiCalls("get", url)
    .then(data => {
      dispatchSetArticles(dispatch, data);
    })
    .catch(() => {
      dispatch(
        ShowMessage({
          message: "Oops Articles not found. API Server error.",
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
