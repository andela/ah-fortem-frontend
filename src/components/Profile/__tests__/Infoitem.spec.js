import React from "react";

import { shallow } from "enzyme";
import { findByTestAttr } from "../../../testutils";

import Infoitem from "../Infoitem";

const setUp = (props = {}) =>
  shallow(
    <Infoitem propname="Key" value={"Value"} icon="library_info" {...props} />
  );

describe("<Infoitem />", () => {
  test("should render Infotag without errors", () => {
    const wrapper = setUp();

    const infoComponent = findByTestAttr(wrapper, "info-item");

    expect(infoComponent.exists()).toBe(true);
  });
  test("should render image if image prop is provided", () => {
    const wrapper = setUp({ image: "image1.com" });
    expect(wrapper.find("img").length).toBe(1);
  });
});
