import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { shallow, mount } from "enzyme";
import axios from "axios";

import { findByTestAttr, storeFactory, diveDeep } from "../../../testutils";

import Profile, { UnconnectedProfile } from "../Profile";
import Editprofile from "../Editprofile";

import Profiledata from "../../../components/Profile/Profiledata";

/**
 *
 * @param {object} props - object that is passed as props to the component
 * @returns { ShallowWrapper } - Enzyme representation of the Component
 */
const setUp = props =>
  diveDeep(
    shallow(
      <MemoryRouter initialEntries={["/profile"]}>
        <Route
          path="/profile"
          render={routerprops => (
            <UnconnectedProfile {...routerprops} {...props} />
          )}
        />
      </MemoryRouter>
    )
  );

jest.spyOn(axios, "get");
const profile = {
  isLoading: true
};
describe("<UnconnectedProfile />", () => {
  test("should show loading indicator when profile data is being loaded", () => {
    const wrapper = setUp({ profile });
    expect(findByTestAttr(wrapper, "profile-loading").length).toBe(1);
  });

  test("should not call getProfile when component mounts if user is not logged in", () => {
    const getProfile = jest.fn();
    const history = {
      push: jest.fn()
    };
    const ShowMessage = jest.fn();
    const wrapper = setUp({ profile, getProfile, history, ShowMessage });
    wrapper.instance().componentDidMount();
    expect(getProfile).not.toBeCalled();
    expect(history.push).toBeCalledWith("/login");
  });

  test("should call getProfile when component mounts if user is logged in", () => {
    // setup user details to localStorage
    localStorage.setItem("token", "usertoken");
    localStorage.setItem("username", "tev");
    const getProfile = jest.fn(() => Promise.resolve({}));
    const optOut = jest.fn(() => Promise.resolve({}));
    const optIn = jest.fn(() => Promise.resolve({}));
    const status = true;
    const wrapper = setUp({ profile, getProfile, optOut, optIn });
    wrapper.instance().componentDidMount();
    wrapper.instance().handleAppNotifications();
    wrapper.instance().handleEmailNotifications(status);
    wrapper.instance().renderProfileData(profile, status);

    expect(getProfile).toBeCalled();
  });

  test("should render data if loading is complete", () => {
    const profile = {
      isOwner: true,
      isLoading: false,
      data: {
        username: "Tev",
        id: 12,
        firstname: ""
      }
    };
    const wrapper = setUp({ profile });
    const profiledata = findByTestAttr(wrapper, "profile-data");

    expect(profiledata.length).toBe(1);
  });
});

describe("<Profile /> /profile page", () => {
  test("should render the profile if the data has been loaded from the server", () => {
    const store = storeFactory();
    const wrapper = mount(
      <MemoryRouter>
        <Profile {...{ store }} />
      </MemoryRouter>
    );
    expect(wrapper.exists()).toBe(true);
  });
});

describe("<Profile /> /profile/:username page", () => {
  test("should use the dynamic username provided in the url", () => {
    const getProfile = jest.fn(() => Promise.resolve({}));
    /**
     * wrap the component inside a real router and provide username
     * as a param and dive in deep till you get to the actual component
     *
     */

    const wrapper = diveDeep(
      shallow(
        <MemoryRouter initialEntries={["/profile/awesomeuser"]}>
          <Route
            path="/profile/:username"
            render={props => (
              <UnconnectedProfile {...props} {...{ getProfile, profile }} />
            )}
          />
        </MemoryRouter>
      )
    );

    // call the componentDidMount method
    wrapper.instance().componentDidMount();
    expect(getProfile).toHaveBeenCalled();
  });
});

describe("<ProfileData /> renderprop", () => {
  test("should pass necessary data to the edit component", () => {
    const data = {
      username: "Tev",
      id: 12,
      firstname: ""
    };
    const wrapper = setUp({
      profile: {
        isLoading: false,
        data,
        isOwner: true
      }
    });

    const profilecomponent = wrapper.find(Profiledata);
    expect(profilecomponent.props().data).toEqual(data);

    /**
     * get the render prop function and call it to see if it calls the edit component
     * with the provided profile data
     */
    const renderPropFunction = profilecomponent.prop("renderEditComponent");
    expect(renderPropFunction({})).toEqual(<Editprofile profiledata={{}} />);
  });
  test("should not render the edit component when the user is not the owner", () => {
    const data = {
      username: "Tev",
      id: 12,
      firstname: ""
    };
    const wrapper = setUp({
      profile: {
        isLoading: false,
        data,
        isOwner: false
      }
    });

    const profilecomponent = wrapper.find(Profiledata);
    expect(profilecomponent.props().data).toEqual(data);

    /**
     * if the isOwner prop is false, we do not render the edit component
     */
    const renderPropFunction = profilecomponent.prop("renderEditComponent");
    expect(renderPropFunction({})).toBe(null);
  });
});
