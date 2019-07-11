import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../../../testutils";

import { UnconnectedEditprofile } from "../Editprofile";

const setUp = props => shallow(<UnconnectedEditprofile {...props} />);

describe("<UnconnectedEditprofile />", () => {
  const profiledata = {
    firstname: "firstname",
    lastname: "lastname",
    bio: "bio"
  };
  test("should render without errors", () => {
    const wrapper = setUp({ profiledata });

    expect(findByTestAttr(wrapper, "edit-profile-form").exists()).toBe(true);
  });

  test("should update state if input boxes are updated", () => {
    const wrapper = setUp({ profiledata });
    expect(wrapper.state()).toEqual({
      profiledata,
      editprofile: false
    });

    const firstnameinput = findByTestAttr(wrapper, "edit-firstname");
    const lastnameinput = findByTestAttr(wrapper, "edit-lastname");
    const bioinput = findByTestAttr(wrapper, "edit-bio");
    findByTestAttr(wrapper, "activate-edit").simulate("click");
    firstnameinput.simulate("change", {
      target: {
        name: "firstname",
        value: "changedfirstname"
      }
    });
    lastnameinput.simulate("change", {
      target: {
        name: "lastname",
        value: "changedlastname"
      }
    });
    bioinput.simulate("change", {
      target: {
        name: "bio",
        value: "changedbio"
      }
    });

    expect(wrapper.state()).toEqual({
      editprofile: true,
      profiledata: {
        bio: "changedbio",
        firstname: "changedfirstname",
        lastname: "changedlastname"
      }
    });
  });
  test("should call the update method with the updated data", () => {
    const saveProfileInfo = jest.fn();
    const wrapper = setUp({ profiledata: {}, saveProfileInfo });
    const firstnameinput = findByTestAttr(wrapper, "edit-firstname");
    findByTestAttr(wrapper, "activate-edit").simulate("click");
    firstnameinput.simulate("change", {
      target: {
        name: "firstname",
        value: "changedfirstname"
      }
    });

    // submit the form data
    wrapper.instance().handleSubmitProfileData({
      preventDefault: jest.fn()
    });

    expect(saveProfileInfo).toBeCalledWith({
      firstname: "changedfirstname"
    });
  });

  test("should set image prop when handleUpdateImage is called", () => {
    const wrapper = setUp({ profiledata });

    wrapper.instance().handleUpdateImage("https://imageurl.com");
    expect(wrapper.state()).toEqual({
      editprofile: false,
      profiledata: {
        bio: "bio",
        firstname: "firstname",
        image: "https://imageurl.com",
        lastname: "lastname"
      }
    });
  });
});
