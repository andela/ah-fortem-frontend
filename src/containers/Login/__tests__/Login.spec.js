import React from "react";
import { shallow } from "enzyme";
import { UnconnectedLogin } from "../Login";
import * as apiCallModule from "../../../Helpers/axios";

const wrapUnconnectedLogin = (props = {}) =>
  shallow(<UnconnectedLogin {...props} />);
const setup = props => {
  return wrapUnconnectedLogin(props);
};
const wrapper = setup({});

const loginReply = {
  user: {
    email: "testuser@gmail.com",
    username: "testuser5556",
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsImV4cCI6MTU2Mjc0ODQ4NX0.Z9ZpsQdm-FNxoYlNLJBXW-VpvlI8bjEp_hw2QtH2qPs"
  }
};
const errorApiReply = {
  errors: {
    error: ["A user with this email and password was not found."],
    email: ["Email required"],
    password: ["password required"]
  }
};
const ShowMessage = jest.fn();
const history = {
  push: jest.fn()
};
describe("<Login>", () => {
  test("<login> should render snackbar without errors", () => {
    expect(wrapper).toBeTruthy();
    const loginComponent = wrapper.find('[data-test="comp-login"]');
    expect(loginComponent.length).toBe(1);
  });
  test("login form data fill ", () => {
    const wrapper = wrapUnconnectedLogin();
    const inputEmail = wrapper.find("#email").first();
    const inputPass = wrapper.find("#password").first();
    inputEmail.simulate("change", {
      persist: jest.fn(),
      target: {
        value: "mail23@mail.com",
        name: "email"
      }
    });
    inputPass.simulate("change", {
      persist: jest.fn(),
      target: {
        value: "password",
        name: "password"
      }
    });
    inputPass.simulate("change", {
      persist: jest.fn(),
      target: {
        value: "changinPassword",
        name: "password"
      }
    });

    expect(wrapper.state("user")).toEqual({
      email: "mail23@mail.com",
      password: "changinPassword"
    });
  });
  test("Handle submit function", () => {
    apiCallModule.apiCalls = jest.fn(() =>
      Promise.resolve({ status: 200, data: loginReply })
    );

    const wrapper = wrapUnconnectedLogin({ history, ShowMessage });

    const loginForm = wrapper.find("form").first();
    const preventDefault = jest.fn();
    loginForm.simulate("submit", { preventDefault });
    const event = { preventDefault };
    wrapper
      .instance()
      .handleSubmit(event)
      .then(() => {
        expect(apiCallModule.apiCalls).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalled();
      });
  });
  test("Handle submit function", () => {
    apiCallModule.apiCalls = jest.fn(() =>
      Promise.resolve({ status: 200, data: null })
    );

    const wrapper = wrapUnconnectedLogin({ history, ShowMessage });

    const loginForm = wrapper.find("form").first();
    const preventDefault = jest.fn();
    loginForm.simulate("submit", { preventDefault });
    const event = { preventDefault };
    wrapper
      .instance()
      .handleSubmit(event)
      .then(() => {
        expect(apiCallModule.apiCalls).toHaveBeenCalled();
        expect(ShowMessage).toHaveBeenCalled();
      });
  });
  test("Handle submit function with error 400", () => {
    apiCallModule.apiCalls = jest.fn(() =>
      Promise.reject({ response: { status: 400, data: errorApiReply } })
    );

    const wrapper = wrapUnconnectedLogin({ history, ShowMessage });

    const preventDefault = jest.fn();
    const event = { preventDefault };
    wrapper
      .instance()
      .handleSubmit(event)
      .then(() => {
        expect(apiCallModule.apiCalls).toHaveBeenCalled();
        expect(ShowMessage).toHaveBeenCalled();
      })
      .then(() => {
        expect(ShowMessage).toHaveBeenCalledWith({
          message: errorApiReply.errors.error[0],
          type: "error"
        });
      });
  });
  test("Handle submit function with error 500", () => {
    apiCallModule.apiCalls = jest.fn(() =>
      Promise.reject({ response: { status: 500, data: errorApiReply } })
    );

    const wrapper = wrapUnconnectedLogin({ history, ShowMessage });

    const preventDefault = jest.fn();
    const event = { preventDefault };
    wrapper
      .instance()
      .handleSubmit(event)
      .then(() => {
        expect(apiCallModule.apiCalls).toHaveBeenCalled();
        expect(ShowMessage).toHaveBeenCalled();
      })
      .then(() => {
        expect(ShowMessage).toHaveBeenCalledWith({
          message: "Api Server error 500. Try logging in again",
          type: "error"
        });
      });
  });
  test("Message shows when user accesses Login while already loggged in", () => {
    localStorage.setItem("token", "Thisisatoken");
    const wrapper = wrapUnconnectedLogin({ history, ShowMessage });
    wrapper.instance().componentDidMount();
    expect(ShowMessage).toHaveBeenCalled();
  });
});
