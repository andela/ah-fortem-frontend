import React from "react";
import { shallow } from "enzyme";
import { RenderSocialAuth } from "../SocialAuth";

it("renders social auth list", () => {
  const wrapper = shallow(<RenderSocialAuth />);
  const authList = wrapper.find("[data-test='social-auth']");
  expect(authList.length).toBe(1);
});
