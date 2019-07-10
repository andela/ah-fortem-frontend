import React from "react";
import { shallow, mount } from "enzyme";
import { StaticRouter } from "react-router-dom";
import Navbar, { LogoutLink } from "../Navbar";

const history = {
  push: jest.fn()
};

const setUp = (loggeIn = false) => {
  return mount(
    <StaticRouter>
      <Navbar isLoggedin={loggeIn} history={history} />
    </StaticRouter>
  );
};
describe("<Navbar />", () => {
  test("should render Navbar without errors", () => {
    const wrapper = setUp(false);
    expect(wrapper).toBeTruthy();
    const linksList = wrapper.find('[data-test="links-list"]');
    expect(linksList.length).toBe(1);
  });
  test("should render Auth Links when isLoggedin is true", () => {
    const wrapper = setUp(true);
    expect(wrapper.find({ to: "/profile" }).length).toBe(2);
  });

  test("Should logout on Click logout button", () => {
    const wrapper = shallow(<LogoutLink isLoggedin={true} history={history} />);
    const logoutlink = wrapper.find('[data-test="logout-link"]').first();
    logoutlink.simulate("click");
    expect(history.push).toHaveBeenCalled();
  });
});
