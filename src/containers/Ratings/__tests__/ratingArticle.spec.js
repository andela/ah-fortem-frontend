import React from "react";
import { mount } from "enzyme";
import Rating from "../RatingArticle";
import { findByTestAttr } from "../../../testutils";
import { Provider } from "react-redux";
import axios from "axios";
import { storeFactory } from "../../../testutils/index";

jest.spyOn(axios, "post");

const store = storeFactory();
const data = {
  article: {
    id: 5
  },
  match: {
    params: { slug: "this-a-good-article" }
  },
  ratings: 5,
  viewArticle: jest.fn()
};

const data2 = {
  article: {
    id: 5
  },
  match: {
    params: { slug: "this-a-good-article" }
  },
  ratings: null,
  viewArticle: jest.fn()
};

const mountedWrapper = props => {
  return mount(
    <Provider {...{ store }}>
      <Rating {...props} />
    </Provider>
  );
};
const setUp = () => {
  return mountedWrapper(data);
};

const setupNull = () => {
  return mountedWrapper(data2);
};

axios.post.mockImplementation(() => Promise.resolve({}));
const wrapper = setUp();
const wrapperNull = setupNull();

describe("<Rating Articles", () => {
  test("should render rating ", () => {
    expect(wrapper).toBeTruthy();
  });

  test("should handle onrate", () => {
    const rater = findByTestAttr(wrapper, "on-rate").first();
    rater.props().onRate({ rating: 2 });
  });

  test("should render null rating state", () => {
    expect(wrapperNull).toBeTruthy();
  });
});
