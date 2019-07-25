import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../testutils/";
import SearchLoading from "../SearchLoading";

test("should render all 5 loaders", () => {
  const wrapper = shallow(<SearchLoading />);
  expect(findByTestAttr(wrapper, "loading-article").length).toBe(5);
});
