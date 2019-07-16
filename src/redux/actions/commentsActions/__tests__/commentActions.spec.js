import axios from "axios";

import { createComment, getArticleComments } from "../commentsActions";
import { storeFactory } from "../../../../testutils";

jest.spyOn(axios, "get");
jest.spyOn(axios, "post");

const comment = {
  id: 1,
  body: "new comment"
};

/**
 *
 * @param {Promise} promisefn - a function that returns a promise
 * @returns Jest expect
 */
const commentsActionTestCaseFunction = (
  promisefn,
  expectedValue = [comment]
) => {
  const store = storeFactory();
  store.dispatch(promisefn).then(() => {
    const newState = store.getState();
    expect(newState.comments).toEqual({
      comments: expectedValue,
      isLoading: false
    });
  });
};

describe("createComment fns", () => {
  test("should create a comment and update the redux store", () => {
    axios.post.mockImplementation(() => {
      return Promise.resolve({
        data: comment
      });
    });

    commentsActionTestCaseFunction(createComment("article-1", comment));
  });
});

describe("getArticleComments fns", () => {
  test("should set the comments fetched from the api to the comments List.", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          Comments: [comment]
        }
      })
    );
    commentsActionTestCaseFunction(getArticleComments("article-1"));
  });

  test("should return empty array if the article has no comments", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {}
      })
    );
    commentsActionTestCaseFunction(getArticleComments("article-1"), []);
  });
});
