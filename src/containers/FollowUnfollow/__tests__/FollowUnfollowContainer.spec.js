import React from "react";
import { mount } from "enzyme";
import { FollowUnfollow } from "../FollowUnfollowContainer";
import axios from "axios";

const setUp = props => mount(<FollowUnfollow {...props}></FollowUnfollow>);

describe("<FollowUnfollow /> renders", () => {
  jest.spyOn(axios, "get");
  jest.spyOn(axios, "post");
  axios.post.mockImplementation(() => Promise.resolve({}));
  jest.spyOn(axios, "delete");
  axios.delete.mockImplementation(() => Promise.resolve({}));

  test("Should render without fail", () => {
    jest.spyOn(axios, "get");
    const props = {
      username: "testuser"
    };
    const axionRes = {
      status: 200,
      data: {
        profile: {
          image: "https://i.imgur.com/My1cRVT.png",
          bio: "Your Demo lead for the sprint",
          id: 12,
          username: "testUser",
          firstname: "name",
          following: true,
          lastname: "last",
          email_notifications: true,
          in_app_notifications: true,
          fullname: "Martin Mutuma"
        }
      }
    };
    const wrapper = setUp(props);
    axios.get.mockImplementation(() => Promise.resolve(axionRes));
    expect(wrapper).toBeTruthy();
    wrapper.instance().componentDidMount();

    expect(axios.get).toBeCalled();
  });
  test("Should render without fail for following false", () => {
    const props = {
      username: "testuser2"
    };
    const axionRes = {
      status: 200,
      data: {
        profile: {
          image: "https://i.imgur.com/My1cRVT.png",
          bio: "Test 3 ",
          username: "testUser2",
          firstname: "namee",
          following: false,
          lastname: "last"
        }
      }
    };
    const wrapper = setUp(props);
    axios.get.mockImplementation(() => Promise.resolve(axionRes));
    expect(wrapper).toBeTruthy();
    wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        expect(axios.get).toHaveBeenCalled();
      });
    wrapper.instance().handleClick();
    expect(axios.post).toBeCalled();
    axios.post.mockImplementation(() => Promise.reject({}));
    wrapper.instance().handleClick();
    expect(axios.post).toBeCalled();
  });
  test("Should render without fail for following false", () => {
    const handleOnChange = jest.fn();
    const props = { handleOnChange: handleOnChange };
    const wrapper = setUp(props);
    handleOnChange.mockImplementation(username => false);
    wrapper.setState({ label: "unfollow" });
    wrapper.instance().handleClick();

    expect(axios.delete).toBeCalled();
  });
  test("Should render without fail for following false", () => {
    const wrapper = setUp({});
    wrapper.setState({ label: "unfollow" });

    const handleOnChange = jest.fn();
    jest.spyOn(axios, "delete");
    handleOnChange.mockImplementation(username => true);
    wrapper.setProps({ handleOnChange: handleOnChange });

    wrapper
      .instance()
      .handleClick()
      .then(() => {
        expect(axios.delete).toHaveBeenCalled();
        expect(wrapper.state("label")).toEqual("unfollow");
      });
    axios.delete.mockImplementation(() => Promise.reject({}));
    wrapper
      .instance()
      .handleClick()
      .then(() => {
        expect(wrapper.state("label")).toEqual("unfollow");
      });
    expect(axios.delete).toBeCalled();
  });
});
