import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../../testutils";
import Followers from "../FollowersContainer";
import FollowersComp from "../../../components/Profile/Followers";

import axios from "axios";

const setUp = props => mount(<Followers {...props} />);
const makeProps = userType => ({
  userType: userType,
  username: "testuser"
});
const makeResponse = (type = "following") => ({
  data: {
    [type]: [
      {
        image: "https://i.imgur.com/XaTX3dV.png",
        bio: "The test user",
        username: "testuser",
        firstname: "",
        lastname: "",
        fullname: " "
      },
      {
        image: "https://i.imgur.com/My1cRVT.png",
        bio: "Your Demo lead for the sprint",
        username: "martin",
        firstname: "Martin",
        lastname: "Mutuma",
        fullname: "Martin Mutuma"
      }
    ]
  }
});
describe("< FOllower /> testcase", () => {
  const props = {
    userType: "followers",
    username: "testuser"
  };
  jest.spyOn(axios, "get");
  test("should render loading component", () => {
    const wrapper = setUp(props);
    expect(wrapper).toBeTruthy();
    const loading = findByTestAttr(wrapper, "follow-loading");
    expect(loading.length).toEqual(1);
  });
  test("should render component with followers", () => {
    const wrapper = setUp(props);
    expect(wrapper).toBeTruthy();
    const people = makeResponse("followers").data.followers;
    wrapper.setState({ people: people, loading: false });
    const followersComponent = wrapper.find(FollowersComp);
    expect(followersComponent.length).toEqual(1);
  });
  test("should get following when component mounts", () => {
    const wrapper = setUp(makeProps("following"));
    expect(wrapper).toBeTruthy();
    const loading = findByTestAttr(wrapper, "follow-loading");
    expect(loading.length).toEqual(1);
    axios.get.mockImplementation(() => Promise.resolve(makeResponse()));
    wrapper.instance().componentDidMount();
    expect(axios.get).toBeCalled();
    axios.get.mockImplementation(() =>
      Promise.resolve(makeResponse("followers"))
    );
    const people = makeResponse("following").data.following;
    wrapper.setState({ people: people });
    wrapper
      .instance()
      .componentDidMount()
      .catch(error => {});
    expect(axios.get).toBeCalled();
    wrapper.instance().handleOnChange("martin");
    const stateExpect = [
      {
        image: "https://i.imgur.com/XaTX3dV.png",
        bio: "The test user",
        username: "testuser",
        firstname: "",
        lastname: "",
        fullname: " "
      }
    ];
    expect(wrapper.state("people")).toEqual(stateExpect);
  });
});
