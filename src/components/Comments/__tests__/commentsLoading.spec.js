import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../testutils";

import Loadingcomments from "../CommentsLoading";

describe("<Loadingcomments />", () => {
  test("should render loading comments container", () => {
    const wrapper = shallow(<Loadingcomments />);
    const loadingItems = findByTestAttr(wrapper, "loading-comments");
    expect(loadingItems.length).toBe(5);
  });
});
