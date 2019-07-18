import React from "react";
import { shallow } from "enzyme";

import renderer from "../../../testutils/renderer";
import { Articles } from "../Articles";

const articles = [
  {
    id: 2,
    title: "This Article is awesome",
    description: "Best article ever",
    body: "Glad i am dead to wwokr",
    image_url: "image_url",
    author: {
      username: "Kimaiyo",
      bio: "",
      image: ""
    },
    slug: "dragon-rider",
    avg_rating: 0,
    rating_count: 0,
    tags: [],
    read_time: "1 min read"
  }
];

const getArticles = jest.fn();

const setup = (props = { articles, getArticles }, state = null) => {
  return shallow(<Articles {...props} />);
};

const wrapper = setup();

test("should render Articles page without errors", () => {
  renderer(wrapper, "test-article");
});

test("should test if handleNewPagination is called", () => {
  wrapper.instance().handleNewPagination(1)();
  expect(getArticles).toHaveBeenCalledWith(1);
});
