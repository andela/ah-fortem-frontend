import React from "react";

import { mount } from "enzyme";

import Noarticlefound from "../NoArticlesFound";

test("should render the component without error & should call handleNewSearch", () => {
  const handleNewSearch = jest.fn();
  const wrapper = mount(<Noarticlefound {...{ handleNewSearch }} />);
  expect(wrapper.exists()).toBe(true);
  wrapper.find("a").simulate("click");
  expect(handleNewSearch).toBeCalled();
});
