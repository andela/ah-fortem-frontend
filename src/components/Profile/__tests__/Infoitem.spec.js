import React from "react";

import { shallow } from "enzyme";
import { findByTestAttr } from "../../../testutils";

import Infoitem from "../Infoitem";

describe("<Infoitem />", () => {
  test("should render Infotag without errors", () => {
    const wrapper = shallow(
      <Infoitem propname="Key" value={"Value"} icon="library_info" />
    );

    const infoComponent = findByTestAttr(wrapper, "info-item");

    expect(infoComponent.exists()).toBe(true);
  });
});
