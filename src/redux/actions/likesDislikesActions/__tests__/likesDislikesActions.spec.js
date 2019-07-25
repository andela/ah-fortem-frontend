import axios from "axios";

import {
  postLikes,
  getLikes,
  deleteLikes,
  handleErors
} from "../likesDislikesActions";
import { storeFactory } from "../../../../testutils";
import * as snackbar from "../../SnackBarAction";

jest.spyOn(snackbar, "ShowMessage");
jest.spyOn(axios, "get");
jest.spyOn(axios, "post");
const likesCount = {
  likesCount: {
    likes: 20,
    dislikes: 0,
    total: 20
  }
};
const error403 = {
  response: {
    staus: 403
  }
};

const likeDislikeActionTestCaseFunction = (
  promisefn,
  expectedValue = [likesCount]
) => {
  const store = storeFactory();
  store.dispatch(promisefn).then(() => {
    const newState = store.getState();
    expect(newState.articles.likesCount).toEqual(likesCount);
  });
};

describe("post Like dislike Function", () => {
  test(" should make call to the api and update the redux store", () => {
    axios.post.mockImplementation(() => {
      return Promise.resolve({
        staus: 200,
        data: likesCount
      });
    });

    likeDislikeActionTestCaseFunction(postLikes({}, "article-slug"));
  });
});

describe("get likes count fuctions", () => {
  test("should set the likesCount fetched from the api to the articles likesCount in state.", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        staus: 200,
        data: likesCount
      })
    );
    likeDislikeActionTestCaseFunction(getLikes("article-slug"));
  });

  test("should Delete and update likescount in the store", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: likesCount,
        staus: 200
      })
    );
    likeDislikeActionTestCaseFunction(deleteLikes("article-slug"));
  });
});
describe("errors for data", () => {
  const store = storeFactory();

  test("403 error test for post", () => {
    axios.post.mockImplementation(() => Promise.reject({ error403 }));
    store.dispatch(postLikes("article-slug")).then(() => {
      expect(snackbar.ShowMessage).toBeCalled();
    });
  });
  test("Get 403 error ", () => {
    axios.get.mockImplementation(() => Promise.reject(error403));
    likeDislikeActionTestCaseFunction(getLikes("article-slug"));
  });
});
describe("test handle errors", () => {
  const dispatch = jest.fn();
  const testforhandleErros = response => {
    handleErors(response, dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(snackbar.ShowMessage).toBeCalled();
  };
  test("status 200", () => {
    const response = {
      data: likesCount,
      status: 200
    };
    testforhandleErros(response);
  });
  test("status 403", () => {
    const response = {
      data: likesCount,
      status: 403
    };
    testforhandleErros(response);
  });
  test("status 500", () => {
    const response = {
      data: likesCount,
      status: 500
    };
    testforhandleErros(response);
  });
});
