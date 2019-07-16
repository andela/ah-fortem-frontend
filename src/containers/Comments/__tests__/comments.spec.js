import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import CommentsContainer, { UnconnectedCommentsContainer } from "../Comments";

import { findByTestAttr, storeFactory } from "../../../testutils";
import CommentsLoading from "../../../components/Comments/CommentsLoading";
import CommentsFailure from "../../../components/Comments/ComponentsFailedLoad";

jest.spyOn(axios, "get");
const commentsObj = {
  isLoading: false,
  comments: []
};
/**
 *
 * @param {object} props - props passed to the comments component
 */
const setUp = (
  props = {
    comments: commentsObj
  }
) => shallow(<UnconnectedCommentsContainer {...props} />);

// an article object
const article = {
  slug: "new-article"
};

// props that are used over and over again in the tests
const recurringProps = { article, comments: commentsObj };

// an api error prop
const apiErrorFunction = jest.fn(() => Promise.reject({}));

/**
 * set localStorage in a test
 */
const setLocalStorage = () => localStorage.setItem("token", "yes");

/**
 *
 * @param {String} nodestring - data-test string
 */
const testForComponentLength = nodestring => {
  const wrapper = setUp();

  const targetDiv = findByTestAttr(wrapper, nodestring);
  expect(targetDiv.length).toBe(1);
};

/**
 *
 * @param {Shallow} wrapper - shallow wrapper
 * @param {React.Component} component - the react component we are searching for
 */
const testComponentLength = (wrapper, component) =>
  expect(wrapper.find(component).length).toBe(1);

/**
 * this function jyst compares 2 error objects
 * @param {object} proposition - the first object
 * @param {object} assertion - the second object
 */
const testErrorMessageObject = (proposition, assertion) =>
  expect(proposition).toEqual(assertion);

describe("<UnconnectedCommentsContainer />", () => {
  afterEach(() => {
    localStorage.clear();
  });
  test("should render without error", () => {
    testForComponentLength("comments-container-div");
  });

  test("should render ConnectedComponent without error", () => {
    const store = storeFactory({
      comments: {}
    });
    const connectedWrapper = shallow(<CommentsContainer {...{ store }} />);
    expect(connectedWrapper.exists()).toBe(true);
  });

  test("should update commentsBody state on calling handleCommentBody", () => {
    const wrapper = setUp();
    wrapper.instance().handleCommentBody({
      persist: jest.fn(),
      target: {
        value: "New comment body"
      }
    });

    expect(wrapper.state().commentBody).toBe("New comment body");
  });

  test("should fetch comments with article slug when showArticleComments is called", () => {
    const getArticleComments = jest.fn(() => Promise.resolve({}));
    const wrapper = setUp({
      comments: { ...commentsObj },
      article,
      getArticleComments
    });
    wrapper.instance().showArticleComments();
    expect(getArticleComments).toHaveBeenCalled();
    wrapper.instance().handleCommentsLoadingFailure();
    testComponentLength(wrapper, CommentsFailure);
  });

  test("should call showMessage upon successfully creating a comment", done => {
    const createComment = jest.fn(() => Promise.resolve({}));
    const ShowMessage = message => {
      expect(message).toBe("Created the comment successfully.");
      done();
    };
    const wrapper = setUp({
      ...recurringProps,
      createComment,
      ShowMessage
    });
    wrapper.setState({ commentBody: "This article is great" });
    wrapper.instance().postComment({
      preventDefault: jest.fn()
    });
  });

  test("should call showMessage with error message upon comment creation failure", done => {
    const ShowMessage = message => {
      testErrorMessageObject(message, {
        message:
          "Something went wrong creating the comment, please try again and make sure the comment field is not blank",
        type: "error"
      });
      done();
    };
    const wrapper = setUp({
      ...recurringProps,
      createComment: apiErrorFunction,
      ShowMessage
    });
    wrapper.instance().postComment({
      preventDefault: jest.fn()
    });
  });

  test("should render the showCOmments button if showComments is false", () => {
    setLocalStorage();
    testForComponentLength("show-comments");
  });

  test("should render login btn if user is not logged in", () => {
    testForComponentLength("login-to-view-comments");
  });

  test("should render commentsForm component if showComments is true & user is loggedin", () => {
    setLocalStorage();
    const wrapper = setUp();
    const submitBtn = () => findByTestAttr(wrapper, "send-comment");
    wrapper.setState({ showComments: true, submitting: true });
    expect(findByTestAttr(wrapper, "new-comments-form").length).toBe(1);
    expect(submitBtn().text()).toBe("Sending ...");
    wrapper.setState({ submitting: false });
    expect(submitBtn().text()).toBe("Comment");
  });

  test("should render LoadingCommentsCard ", () => {
    const wrapper = setUp({
      comments: {
        isLoading: true
      }
    });

    testComponentLength(wrapper, CommentsLoading);
  });

  test("should call ShowComments if comment is deleted successfully", done => {
    const ShowMessage = message => {
      expect(message).toBe("Successfully deleted the comment");
      done();
    };
    const deleteComment = jest.fn(() => Promise.resolve({}));
    const wrapper = setUp({
      ...recurringProps,
      deleteComment,
      ShowMessage
    });
    wrapper.instance().deleteComment();
  });
  test("should call ShowComments if comment is not deleted successfully with an error", done => {
    const ShowMessage = errorMessage => {
      testErrorMessageObject(errorMessage, {
        message:
          "Could not delete the comment successfully, kindly try again and make sure your internet connection is stable",
        type: "error"
      });
      done();
    };
    const wrapper = setUp({
      ...recurringProps,
      deleteComment: apiErrorFunction,
      ShowMessage
    });
    wrapper.instance().deleteComment();
  });
  test("should call editComment when comment is updated", () => {
    const editComment = jest.fn();
    const componentWrapper = setUp({
      ...recurringProps,
      editComment
    });
    componentWrapper.instance().handleEditComment();
    expect(editComment).toHaveBeenCalled();
  });
});
