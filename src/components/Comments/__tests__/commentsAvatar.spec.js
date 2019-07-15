import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../testutils";

import CommentsAvatar from "../CommentsAvatar";

const user = {
  image: "",
  username: "tev"
};

const setUp = (
  props = {
    user
  }
) => shallow(<CommentsAvatar {...props} />);

describe("<CommentsAvatar />", () => {
  test("should render without error", () => {
    const wrapper = setUp();
    expect(wrapper.exists()).toBe(true);
  });
  test("should render user image if its provided", () => {
    const image = "https://myimage.jpg";
    const wrapper = setUp({ user: { ...user, image } });
    const imgAvatar = findByTestAttr(wrapper, "comment-avatar");
    expect(imgAvatar.props().src).toBe(image);
  });
});
