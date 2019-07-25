import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";

import axios from "axios";
import { storeFactory } from "../../../testutils";
import renderer from "../../../testutils/renderer";
import simulator from "../../../testutils/simulator";

import ConnectedEditArticle, { EditArticle } from "../EditArticle";

jest.spyOn(axios, "put");

const article = {
  author: {
    username: "Kimaiyo",
    bio: "",
    image: ""
  },
  title: "dragon rider",
  description: "Ever wonder how a dragon flies?",
  body: "Lets all breathe fire and fly",
  image_url: "image_url",
  tags: [],
  read_time: "1 min read",
  slug: "dragon-rider",
  avg_rating: 0,
  rating_count: 0
};
const setup = (props = { article }) => {
  return shallow(<EditArticle {...props} />);
};

describe("Tests for Editing an article", () => {
  test("should render page without errors", () => {
    const wrapper = setup();
    renderer(wrapper, "edit-test");
  });

  test("should UpdateArticle successfully", () => {
    const updateArticle = jest.fn(() => Promise.resolve({}));
    const history = {
      push: jest.fn()
    };

    axios.put.mockImplementation(() =>
      Promise.resolve({
        slug: "article-slug"
      })
    );
    const wrapper = setup({ article, updateArticle, history });

    wrapper
      .instance()
      .UpdateArticle({
        preventDefault: jest.fn()
      })
      .then(() => {
        expect(updateArticle).toHaveBeenCalled();
      });
  });

  test("should call componentDidMount and pass slug to the viewArticlefn", () => {
    const viewArticle = jest.fn();
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/edit/awesomearticle"]}>
        <Route
          path="/edit/:slug"
          render={props => (
            <EditArticle {...props} {...{ viewArticle, article }} />
          )}
        />
      </MemoryRouter>
    )
      .dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();
    wrapper.instance().componentDidMount();
    expect(viewArticle).toHaveBeenCalledWith("awesomearticle");
  });

  test("should update state with article returned from redux", () => {
    const store = storeFactory({
      articles: {
        article
      }
    });

    const wrapper = shallow(
      <MemoryRouter initialEntries={["/edit/awesomearticle"]}>
        <Route
          path="/edit/:slug"
          render={props => (
            <ConnectedEditArticle {...props} {...{ store, article }} />
          )}
        />
      </MemoryRouter>
    )
      .dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive()
      .dive();
    expect(wrapper.state()).toEqual({
      body: "Lets all breathe fire and fly",
      description: "Ever wonder how a dragon flies?",
      image: "image_url",
      title: "dragon rider"
    });
    const inst = wrapper.instance();
    inst.handleBody("new body");
    inst.handleImage("img");
    expect(wrapper.state().body).toBe("new body");
    expect(wrapper.state().image).toBe("img");
  });

  test("check title state of edited article ", () => {
    const wrapper = setup();
    simulator(wrapper, "edit-input");
  });
});
