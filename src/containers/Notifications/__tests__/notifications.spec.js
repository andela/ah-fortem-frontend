import React from "react";
import { shallow } from "enzyme";
import { Notifications } from "../notifications";
import { findByTestAttr } from "../../../testutils";

const data = [
  { type: "notify", message: "New article from kimaiyo@gmail.com named event" },
  { type: "notify", message: "New article from kimaiyo@gmail.com named event" }
];

describe("<Notifications/>", () => {
  test("should render Notifications without errors", () => {
    const wrapper = shallow(<Notifications notifications={data} />);
    wrapper.setState({ notifications: data });
    expect(findByTestAttr(wrapper, "notifications").length).toBe(2);
  });
});
