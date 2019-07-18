import axios from "axios";

import {
  createComment,
  getArticleComments,
  deleteComment,
  editComment
} from "../commentsActions";
import { storeFactory } from "../../../../testutils";

jest.spyOn(axios, "get");
jest.spyOn(axios, "post");
jest.spyOn(axios, "delete");
jest.spyOn(axios, "put");

const comment = {
  id: 1,
  body: "new comment"
};

const defaultrecurringComments = {
  comments: {
    comments: [comment],
    isLoading: false
  }
};

/**
 *
 * @param {Promise} promisefn - a function that returns a promise
 * @param {any} expectedValue - what you expect from the comments obj
 * @param {any} initialState - the initial state of the store u want to begin with
 * @returns Jest expect
 */
const commentsActionTestCaseFunction = (
  promisefn,
  expectedValue = [comment],
  initialState = undefined
) => {
  const store = storeFactory(initialState);
  return store.dispatch(promisefn).then(() => {
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

  test("should call the failureCallback when the test fails", () => {
    axios.get.mockImplementation(() => Promise.reject({}));
    const failureCallback = jest.fn();
    commentsActionTestCaseFunction(
      getArticleComments("article-1", failureCallback),
      []
    ).then(() => {
      expect(failureCallback).toHaveBeenCalled();
    });
  });
});

describe("deleteComment fn", () => {
  test("should update the comments Array by deleting a specified comment", () => {
    axios.delete.mockImplementation(() => Promise.resolve({}));
    commentsActionTestCaseFunction(deleteComment("new-article", 1), [], {
      ...defaultrecurringComments
    });
  });
});

describe("editComment fn", () => {
  test("should update the comment with the new body", () => {
    const newBody = "new comment body";
    axios.put.mockImplementation(() => Promise.resolve({}));
    commentsActionTestCaseFunction(
      editComment("slug", 1, newBody),
      [{ id: 1, body: newBody }],
      {
        ...defaultrecurringComments
      }
    );
  });

  test("should not update the comment when a failute is attained", () => {
    axios.put.mockImplementation(() => Promise.reject({}));
    commentsActionTestCaseFunction(
      editComment("slug", 1, "newBody"),
      [comment],
      {
        ...defaultrecurringComments
      }
    );
  });
});
