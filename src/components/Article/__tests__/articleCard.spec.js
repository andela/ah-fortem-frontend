import React from "react";
import { shallow, mount } from "enzyme";
import ArticleCard from "../ArticleCard";
import { findByTestAttr } from "../../../testutils";
import Feedback from "../ArticleFeeback";
import { storeFactory } from "../../../testutils/index";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";

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

const data = {
  article: article,
  match: {
    params: { slug: "this-a-good-article" }
  },
  ratings: 5,
  viewArticle: jest.fn()
};

const testStore = {
  articles: {
    article,
    likesCount: {
      likes: 0,
      dislikes: 0,
      user: "like"
    }
  }
};
const store = storeFactory(testStore);
describe("<Notfound />", () => {
  test("should render Notfound without errors", () => {
    const wrapper = shallow(<ArticleCard {...{ article }} />);
    expect(wrapper).toBeTruthy();
    const card = findByTestAttr(wrapper, "card-test");
    expect(card.length).toBe(1);
  });
});

describe("Feeback Component", () => {
  const setUp = () => {
    return mount(
      <StaticRouter>
        <Provider {...{ store }}>
          <Feedback {...data} />
        </Provider>
      </StaticRouter>
    );
  };
  test("should render without login", () => {
    const wrapper = setUp();
    expect(wrapper).toBeTruthy();
  });
  test("should render with login", () => {
    localStorage.setItem("token", "token");
    const wrapper = setUp();
    expect(wrapper).toBeTruthy();
  });
});
