import React from "react";

import { shallow } from "enzyme";

import { UnconnectedCommentPopup } from "../CommentPopup";
import { findByTestAttr } from "../../../testutils";

const setUpCommentPopup = (props = {}) =>
  shallow(<UnconnectedCommentPopup {...props} />);

const wrapper = setUpCommentPopup();

describe("Test for <CommentPopup />", () => {
  test("Should render the comment pop", () => {
    const renderCommentPopup = findByTestAttr(wrapper, "commentPopup-test");
    expect(renderCommentPopup.length).toBe(1);
  });

  test("Comment popup handle click", () => {
    const showCommentBox = jest.fn();
    const wrapper = setUpCommentPopup({ showCommentBox });
    wrapper.simulate("click", { preventDefault: jest.fn() });
    expect(showCommentBox).toHaveBeenCalled();
  });
});
