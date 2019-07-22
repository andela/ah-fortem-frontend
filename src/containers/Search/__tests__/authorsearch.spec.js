import React from "react";
import axios from "axios";
import { mount } from "enzyme";
import Downshift from "downshift";

import Authorsearch from "../Authorsearch";

jest.spyOn(axios, "get");
jest.useFakeTimers();

const setUpComponent = (props = {}) => mount(<Authorsearch {...props} />);

const users = [
  {
    username: "username"
  }
];

/**
 *
 * @param {JSX shallow wrapper} downshift - the downshift component
 * @returns {Object} - the downshift prop object
 */
const downshiftProps = downshift => downshift.props();

/**
 *
 * @param {Shallow JSX} wrapper - the wrapper component
 */
const downShiftInput = wrapper => wrapper.find("input");

describe("<Authorsearch />", () => {
  test("should render fetched authors", () => {
    const jsObj = p => p;
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: []
      })
    );

    const wrapper = setUpComponent();
    const downShift = wrapper.find(Downshift);
    downShiftInput(wrapper).simulate("keyDown", { keyCode: 40, key: "40" });
    wrapper.setProps({ fullPage: true });

    wrapper.setState({ users });
    wrapper.instance().handleNameChange({
      target: {
        value: "user"
      }
    });
    downshiftProps(downShift).children({
      getInputProps: jsObj,
      getItemProps: jsObj,
      getLabelProps: jsObj,
      getMenuProps: jsObj,
      isOpen: true,
      inputValue: "username",
      highlightedIndex: 0,
      selectedItem: ""
    });

    expect(downshiftProps(downShift).itemToString(users[0])).toBe(
      users[0].username
    );
    expect(downshiftProps(downShift).itemToString(null)).toBe("");

    jest.runAllTimers();

    expect(axios.get).toHaveBeenCalled();
  });
  test("should submit author", () => {
    const handleSubmitAuthor = jest.fn();
    const wrapper = setUpComponent({
      handleSubmitAuthor,
      defaultAuthor: "Editor"
    });
    wrapper.instance().handleSubmitAuthor(users[0]);
    expect(handleSubmitAuthor).toHaveBeenCalledWith(users[0].username);
    wrapper.instance().handleSubmitAuthor(null);
    expect(handleSubmitAuthor).toHaveBeenCalledWith("");
  });
});
