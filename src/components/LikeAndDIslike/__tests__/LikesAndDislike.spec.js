import React from "react";

import { mount } from "enzyme";

import LikeDislike from "../LikeAndDislike";
import { StaticRouter } from "react-router-dom";
import { findByTestAttr } from "../../../testutils";

const setUp = (handleClick, props, state) => {
  return mount(
    <StaticRouter>
      <LikeDislike handleClick={handleClick} props={props} {...state} />
    </StaticRouter>
  );
};
describe("<LikeDislike />", () => {
  const handleClick = jest.fn();
  const props = {
    likesCount: {
      likes: 0,
      disllikes: 0
    }
  };
  const state = {
    like: {
      className: "",
      clicked: false
    },
    dislike: {
      className: "",
      clicked: false
    }
  };

  test("should render input box without errors", () => {
    localStorage.setItem("token", "Tokenforuser");

    const wrapper = setUp(handleClick, props, state);

    const dislike = findByTestAttr(wrapper, "dislike-btn");

    expect(dislike.length).toBe(1);
  });
  test("should render login error when not logged in", () => {
    localStorage.clear();
    const wrapper = setUp(handleClick, props, state);
    const dislike = findByTestAttr(wrapper, "not-logged-in").first();

    expect(dislike.length).toBe(1);
  });
});
