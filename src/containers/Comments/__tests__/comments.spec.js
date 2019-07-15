import React from "react";
import { shallow } from "enzyme";
import CommentsContainer, { UnconnectedCommentsContainer } from "../Comments";

import { findByTestAttr, storeFactory } from "../../../testutils";
import CommentsLoading from "../../../components/Comments/CommentsLoading";

const commentsObj = {
  isLoading: false
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

const article = {
  slug: "new-article"
};

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
    const getArticleComments = jest.fn();
    const wrapper = setUp({
      comments: { ...commentsObj },
      article,
      getArticleComments
    });
    wrapper.instance().showArticleComments();
    expect(getArticleComments).toHaveBeenCalledWith(article.slug);
  });

  test("should call showMessage upon successfully creating a comment", done => {
    const createComment = jest.fn(() => Promise.resolve({}));
    const ShowMessage = message => {
      expect(message).toBe("Created the comment successfully.");
      done();
    };
    const wrapper = setUp({
      comments: commentsObj,
      article,
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
      expect(message).toEqual({
        message:
          "Something went wrong creating the comment, please try again and make sure the comment field is not blank",
        type: "error"
      });
      done();
    };
    const wrapper = setUp({
      comments: commentsObj,
      article,
      createComment: jest.fn(() => Promise.reject({})),
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

    expect(wrapper.find(CommentsLoading).length).toBe(1);
  });
});
