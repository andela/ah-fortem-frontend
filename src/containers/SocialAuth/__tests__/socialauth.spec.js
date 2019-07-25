import React from "react";
import firebase from "firebase";
import { shallow } from "enzyme";
import { SocialAuth, SocialIcon } from "../SocialAuth";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import axios from "axios";

jest.spyOn(firebase, "initializeApp").mockImplementation(() => {
  return {
    auth: () => {
      return {};
    }
  };
});
const history = {
  push: jest.fn()
};

const ShowMessage = jest.fn();
const TwitterAuthProvider = function() {
  this.name = "test";
  this.foo = jest.fn(() => {
    return "bar";
  });
};
const result = {
  credential: {
    accessToken: "accessToken",
    secret: "secret"
  }
};

const returnAccesstoken = {
  accessToken: ""
};
const signInWithPopup = jest.fn(() => Promise.resolve(result));
const authMock = jest.spyOn(firebase, "auth").mockImplementation(() => {
  return {
    signInWithPopup
  };
});

authMock.TwitterAuthProvider = TwitterAuthProvider;

jest.spyOn(axios, "post");

const wrapper = shallow(<SocialAuth {...{ history, ShowMessage }} />);
const assertFunctionCall = fn => expect(fn).toBeCalled();

const resolveRenderPropFn = param => param.renderProp("render")({});

const wrapperInstance = wrapper.instance();
test("handleTwitterAuth", () => {
  axios.post.mockImplementation(() =>
    Promise.resolve({
      data: {
        user: {
          token: "",
          email: "",
          username: ""
        }
      }
    })
  );

  wrapper
    .instance()
    .handleTwitterAuth()
    .then(() => {
      assertFunctionCall(axios.post);
    });
});

test("handleSocialAuth", () => {
  wrapper
    .instance()
    .handleSocialAuth()
    .then(() => {
      assertFunctionCall(history.push);
    });
});

const rejectedPromise = Promise.reject({
  data: {
    user: {
      token: "",
      email: "",
      username: ""
    }
  }
});

test("handleTwitterAuth & handleSocialAuth rejection", () => {
  axios.post.mockImplementation(() => rejectedPromise);
  wrapperInstance.handleSocialAuth().then(() => {
    expect(ShowMessage).toHaveBeenCalled();
  });
  wrapperInstance.handleTwitterAuth().then(() => {
    expect(ShowMessage).toHaveBeenCalled();
  });
});
test("facebook callback is called", () => {
  const facebook = wrapper.find(FacebookLogin);
  facebook.props().callback(returnAccesstoken);

  expect(
    resolveRenderPropFn(facebook).equals(
      <SocialIcon icon="fa-facebook" renderProps={{}} />
    )
  ).toBe(true);
});

test("google onSuccess is called", () => {
  const google = wrapper.find(GoogleLogin);
  google.props().onSuccess(returnAccesstoken);
  const googlesocialIcon = resolveRenderPropFn(google);
  expect(
    googlesocialIcon.equals(<SocialIcon icon="fa-google" renderProps={{}} />)
  ).toBe(true);
});

test("social icon renders without error", () => {
  const social = shallow(<SocialIcon />);
  expect(social.exists()).toBe(true);
});
