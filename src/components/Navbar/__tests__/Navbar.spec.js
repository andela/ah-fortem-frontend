import React from "react";
import { shallow, mount } from "enzyme";
import { StaticRouter } from "react-router-dom";
import Navbar, { LogoutLink } from "../Navbar";
import { Provider } from "react-redux";
import { storeFactory } from "../../../testutils/index";

const store = storeFactory();
const history = {
  push: jest.fn()
};
const setUp = (loggeIn = false) => {
  return mount(
    <StaticRouter>
      <Provider {...{ store }}>
        <Navbar history={history} />
      </Provider>
    </StaticRouter>
  );
};
describe("<Navbar />", () => {
  test("should render Auth Links when isLoggedin is true", () => {
    localStorage.setItem("token", "this is a token");
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
