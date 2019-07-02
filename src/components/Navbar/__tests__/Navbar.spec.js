import React from "react";
import { shallow, mount } from "enzyme";
import { StaticRouter } from "react-router-dom";
import Navbar from "../Navbar";

describe("<Navbar />", () => {
  test("should render Navbar without errors", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toBeTruthy();
    const linksList = wrapper.find('[data-test="links-list"]');
    expect(linksList.length).toBe(1);
  });
  test("should render Auth Links when isLoggedin is true", () => {
    const wrapper = mount(
      <StaticRouter>
        <Navbar isLoggedin={true} />
      </StaticRouter>
    );
    expect(wrapper.find({ to: "/profile" }).length).toBe(2);
  });
});
