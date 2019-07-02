import React from "react";
import { findByTestAttr } from "../../../testutils";
import { shallow } from "enzyme";

import Profiledata from "../Profiledata";

/**
 *
 * @param {object} props - object that is passed as props to the component
 * @returns { ShallowWrapper } - Enzyme representation of the Component
 */
const setUp = props => shallow(<Profiledata {...props} />);

describe("<Profiledata />", () => {
  const profile = {
    firstname: "",
    lastname: "",
    id: 12,
    username: "tester"
  };
  test("should render without error", () => {
    const renderEditComponent = jest.fn();
    const wrapper = setUp({ data: profile, renderEditComponent });
    const container = findByTestAttr(wrapper, "profile-data-component");
    expect(container.length).toBe(1);
    expect(renderEditComponent).toBeCalled();
  });
  test("should render default image if non is provided in profile info", () => {
    const renderEditComponent = jest.fn();
    const wrapper = setUp({ data: profile, renderEditComponent });

    const img = findByTestAttr(wrapper, "profile-image");
    expect(img.props()).toEqual({
      alt: "tester",
      className: "profile-avatar",
      "data-test": "profile-image",
      src: "test-file-stub" // see __mocks__/fileMock.js  to see how we setup jest to view images
    });
  });

  test("should render custom image if its provided in the data", () => {
    const renderEditComponent = jest.fn();
    const wrapper = setUp({
      data: { ...profile, image: "https://imgurimage.com" },
      renderEditComponent
    });

    const img = findByTestAttr(wrapper, "profile-image");
    expect(img.props()).toEqual({
      alt: "tester",
      className: "profile-avatar",
      "data-test": "profile-image",
      src: "https://imgurimage.com"
    });
  });
});
