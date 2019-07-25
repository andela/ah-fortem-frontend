import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "../../../testutils";
import Followers from "../Followers";
import FollowUnfollow from "../../../containers/FollowUnfollow/FollowUnfollowContainer";

const setUp = props => mount(<Followers {...props} />);

describe("<Follower /> renders without fail", () => {
  test("Render profile-no-user ", () => {
    const wrapper = shallow(<Followers />);
    expect(wrapper).toBeTruthy();

    const nofollowers = findByTestAttr(wrapper, "profile-no-users");
    expect(nofollowers.length).toEqual(1);
  });
  test("should Render Followers section Followers are present", () => {
    const props = {
      people: [
        {
          image: "https://i.imgur.com/My1cRVT.png",
          bio: "Your Demo lead for the sprint",
          username: "martin",
          firstname: "Martin",
          lastname: "Mutuma",
          fullname: "Martin Mutuma"
        },
        {
          image: "https://i.imgur.com/My1cRVT.png",
          bio: "Your Demo lead for the sprint",
          username: "user",
          firstname: "User1",
          lastname: "last ",
          fullname: "User last"
        },
        {
          image: "",
          bio: "Your Demo lead for the sprint",
          username: "user",
          firstname: "User1",
          lastname: "last ",
          fullname: "User last"
        }
      ],
      type: "Followers"
    };
    const wrapper = setUp(props);
    expect(wrapper).toBeTruthy();
    const nofollowers = findByTestAttr(wrapper, "user-section");
    expect(nofollowers.length).toEqual(3);
    const container = wrapper.find(FollowUnfollow).first();
    container.instance().props.handleOnChange();
  });
});
