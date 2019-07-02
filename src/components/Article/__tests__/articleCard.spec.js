import React from "react";
import { shallow } from "enzyme";
import ArticleCard from "../ArticleCard";
import { findByTestAttr } from "../../../testutils";

describe("<Notfound />", () => {
  test("should render Notfound without errors", () => {
    const article = {
      id: 10,
      body: "This is all but an article",
      description: "Artilces are not the best things to add",
      title: "Super fly",
      image_url: "image_url",
      author: {
        username: "Kimaiyo",
        bio: "",
        image: ""
      },
      slug: "dragon-rider",
      avg_rating: 0,
      tags: [],
      read_time: "1 min read"
    };
    const wrapper = shallow(<ArticleCard {...{ article }} />);
    expect(wrapper).toBeTruthy();
    const card = findByTestAttr(wrapper, "card-test");
    expect(card.length).toBe(1);
  });
});
