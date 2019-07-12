import React from "react";
import { shallow, mount } from "enzyme";
import { StaticRouter } from "react-router-dom";
import Navbar, { LogoutLink } from "../Navbar";

import { Provider } from "react-redux";
import store from "../../../redux/store";

const history = {
  push: jest.fn()
};

const wrapper = mount(
  <StaticRouter>
    <Provider {...{ store }}>
      <Navbar isLoggedin={true} history={history} />
    </Provider>
  </StaticRouter>
);
describe("<Navbar />", () => {
  test("should render Auth Links when isLoggedin is true", () => {
    expect(wrapper.find({ to: "/profile" }).length).toBe(2);
  });

  test("Should logout on Click logout button", () => {
    const wrapper = shallow(<LogoutLink isLoggedin={true} history={history} />);
    const logoutlink = wrapper.find('[data-test="logout-link"]').first();
    logoutlink.simulate("click");
    expect(history.push).toHaveBeenCalled();
  });
});
