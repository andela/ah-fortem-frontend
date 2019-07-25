import React from "react";

import { shallow } from "enzyme";
import ConnectedPopup, { UnConnectedCommentPopupBox } from "../CommentPopupBox";
import { findByTestAttr, storeFactory } from "../../../testutils";

const setUpCommentPopupBox = (props = {}) =>
  shallow(<UnConnectedCommentPopupBox {...props} />);

const gWrapper = setUpCommentPopupBox();

describe("Tests for <CommentPopupBox />", () => {
  test("Should render commentpopup without error", () => {
    const renderCommentPopupBox = findByTestAttr(gWrapper, "popupbox-test");
    expect(renderCommentPopupBox.length).toBe(1);
  });

  test("Handle textbox change", () => {
    const textBoxFIeld = findByTestAttr(gWrapper, "textbox-test");
    textBoxFIeld.simulate("change", {
      preventDefault: jest.fn(),
      target: { value: "This is a test comment" }
    });
    expect(gWrapper.state("comment")).toEqual({
      body: "This is a test comment"
    });
  });

  test("Handle submit", () => {
    const createComment = jest.fn();
    const ShowMessage = jest.fn();
    const hideCommentBox = jest.fn();
    const res = Promise.resolve({ data: { status: 200 } });
    createComment.mockImplementation(() => res);
    const highlight = jest.fn();
    const wrapper = setUpCommentPopupBox({
      createComment,
      ShowMessage,
      hideCommentBox,
      article: { slug: "this-is-the-slug" },
      highlight
    });
    const submitButton = findByTestAttr(wrapper, "submit-test");
    submitButton.simulate("click", { preventDefault: jest.fn() });
    wrapper.instance().handleSuccessfullCommentCreation();
    expect(createComment).toBeCalled();
    expect(hideCommentBox).toBeCalled();
    expect(ShowMessage).toBeCalled();
    const error = Promise.reject({});
    createComment.mockImplementation(() => error);
    submitButton.simulate("click", { preventDefault: jest.fn() });
    expect(ShowMessage).toBeCalled();
  });

  test("Handle cancle", () => {
    const hideCommentBox = jest.fn();
    const wrapper = setUpCommentPopupBox({ hideCommentBox });
    const cancleButtuon = findByTestAttr(wrapper, "cancle-test");
    cancleButtuon.simulate("click", { preventDefault: jest.fn() });
    expect(hideCommentBox).toBeCalled();
  });

  test("should render the connectedCOmponent", () => {
    const wrapper = shallow(<ConnectedPopup store={storeFactory()} />);
    expect(wrapper.exists()).toBe(true);
  });
});
