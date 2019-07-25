import React from "react";
import { shallow } from "enzyme";
import SwitchButton from "../index";

describe("Switch button", () => {
  test("should render without errors", () => {
    const wrapper = shallow(
      <SwitchButton handleChange={jest.fn()} checked={true} />
    );

    expect(wrapper).toBeTruthy();
  });
});
