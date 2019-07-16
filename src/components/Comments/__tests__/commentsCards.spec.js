import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../testutils";
import Avatar from "../CommentsAvatar";
import CommentsCards from "../CommentsCards";

const comments = [
  {
    user: {},
    created_at: new Date()
  }
];

const setUp = (
  props = {
    comments
  }
) => shallow(<CommentsCards {...props} />);

describe("<CommentsCards />", () => {
  test("should render CommentsCards without error", () => {
    const wrapper = setUp();
    expect(wrapper.find(Avatar).length).toBe(1);
  });

  test("should render no-comments-present card of comments are not present", () => {
    const wrapper = setUp({ comments: [] });
    const noCommentCard = findByTestAttr(wrapper, "no-comments-present");
    expect(noCommentCard.length).toBe(1);
  });
});
