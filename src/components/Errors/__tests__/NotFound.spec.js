import React from "react";
import { shallow } from "enzyme";
import Notfound from "../NotFound";


describe("<Notfound />", () => {
  test("should render Notfound without errors", () => {
    const wrapper = shallow(<Notfound />);
    expect(wrapper).toBeTruthy();
    const error404 = wrapper.find('[data-test="error-404"]');
    expect(error404.length).toBe(1);
  });
});
