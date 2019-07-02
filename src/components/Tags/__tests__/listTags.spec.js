import React from "react";
import axios from "axios";
import { findByTestAttr } from "../../../testutils/index";
import { shallow } from "enzyme";
import { ListTags } from "../listTags";
jest.spyOn(axios, "get");

it("renders tags list", () => {
  const wrapper = shallow(<ListTags tags={["test", "here"]} />);
  const tagList = wrapper.find("[data-test='list-tags']");
  expect(tagList.length).toBe(1);
});
it("should call getArticlesByTags when chip is clicked", () => {
  const getArticlesByTags = jest.fn();
  const wrapper = shallow(
    <ListTags tags={["react"]} {...{ getArticlesByTags }} />
  );
  const singleTag = findByTestAttr(wrapper, "react-0");
  singleTag.simulate("click");
  expect(getArticlesByTags).toBeCalledWith("react");
});
