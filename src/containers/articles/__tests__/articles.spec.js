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
const setup = (props = { articles }, state = null) => {
  return shallow(<Articles {...props} />);
};

test("should render Articles page without errors", () => {
  const wrapper = setup();
  renderer(wrapper, "test-article");
});
