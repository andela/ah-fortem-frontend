import React from "react";
import { mount } from "enzyme";

import Cardactions from "../CommentActions";

import renderer from "../../../testutils/renderer";
const handleEditComment = jest.fn();
const cardComponenentWrapper = (
  props = {
    comment: {},
    handleEditComment
  }
) => mount(<Cardactions {...props} />);

const comment = {
  id: 222,
  body: "no comment"
};

describe("<Cardactions />", () => {
  test("should render without error", () => {
    const container = cardComponenentWrapper();
    renderer(container, "card-action-container");
    renderer(container, "delete-prompt-container");
  });

  test("should update the state when toggleDeletePrompt is called", () => {
    const wrapper = cardComponenentWrapper();
    wrapper.instance().toggleDeletePrompt();
    expect(wrapper.state().deletePrompt).toBe(true);
  });

  test("should delete single article when deleteSingleComment is called", () => {
    const deleteComment = jest.fn();
    const wrapper = cardComponenentWrapper({
      deleteComment,
      comment,
      handleEditComment
    });
    wrapper.instance().deleteSingleComment();
    expect(deleteComment).toHaveBeenCalled();
  });

  test("should handle edit functionality", () => {
    const value = "Hello new";
    const handleEditComment = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = cardComponenentWrapper({
      comment,
      handleEditComment
    });
    wrapper.instance().handleToggleEditComment();
    expect(wrapper.state().editComment).toBe(true);
    wrapper.instance().handleChangeCommentBody({
      target: {
        value
      }
    });
    expect(wrapper.state().commentBody).toBe(value);
    wrapper.instance().handleFormCommentSubmission({
      preventDefault
    });
    expect(handleEditComment).toHaveBeenCalled();
  });
});
