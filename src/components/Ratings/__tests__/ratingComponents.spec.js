import React from "react";
import { shallow } from "enzyme";
import { AverageRating, StarRating } from "../RatingComponent";

const wrapperAverageTest = (Component, value) => {
  const wrapper = shallow(<Component average={2} />);
  return expect(wrapper).toBeTruthy();
};
describe("Should render component successfully", () => {
  test("should render average rating componet", () => {
    wrapperAverageTest(AverageRating, 2);
  });
  test("should render Star rating ", () => {
    wrapperAverageTest(StarRating, 2);
  });
});
