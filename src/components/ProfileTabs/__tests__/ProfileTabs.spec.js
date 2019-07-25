import React from "react";
import ProfileTabs from "../ProfileTabs";
import { findByTestAttr } from "../../../testutils";
import { shallow } from "enzyme";

test("<Profiletabs />", () => {
  const wrapper = shallow(<ProfileTabs />);
  const tabs = findByTestAttr(wrapper, "profile-tabs");
  expect(tabs.length).toEqual(1);
  expect(wrapper).toBeTruthy();
});
