import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";

import axios from "axios";
import { findByTestAttr } from "../../../testutils";
import renderer from "../../../testutils/renderer";
import { ViewArticle } from "../ViewArticle";

jest.spyOn(axios, "get");

const article = {
  id: 4,
  image_url: "image_url",
  slug: "dragon-rider",
  avg_rating: 0,
  author: {
    username: "Kimaiyo",
    image: "image url"
  },
  body: "Lets and fly",
  title: "rider",
  description: "Ever wogon flies?",
  tags: [],
  read_time: "1 min read"
};

const viewArticle = jest.fn();

const setup = (props = { article }) => {
  return shallow(<ViewArticle {...props} />);
};

describe("", () => {
  test("should render page without errors", () => {
    const wrapper = setup({ article });
    renderer(wrapper, "view-test");
  });
  test("should render page without errors  when no athor url is provided", () => {
    let editedArticle = article;
    editedArticle.author.image = "";
    const wrapper = setup({ article: editedArticle });
    renderer(wrapper, "view-test");
  });
  test("should render page without errors without article ", () => {
    const set = (props = {}) => {
      return shallow(<ViewArticle {...props} />);
    };
    const wrapper = set();
    renderer(wrapper, "no-view-test");
  });
  test("Should call componentsdidmount when component is rendered", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/articles/article"]}>
        <Route
          path="/articles/:slug"
          render={props => (
            <ViewArticle {...props} {...{ viewArticle, article }} />
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
    expect(viewArticle).toHaveBeenCalledWith("article");
  });

  test("Only author should view the delete button", () => {
    localStorage.setItem("username", "Kimaiyo");
    localStorage.setItem("token", "token");
    const history = {
      push: jest.fn()
    };
    const deleteArticle = jest.fn(() => Promise.resolve({ status: 204 }));
    const wrapper = setup({ article, deleteArticle, history });
    const button = findByTestAttr(wrapper, "delete-button");

    button.simulate("click");
    expect(deleteArticle).toBeCalledWith("dragon-rider", "token");
  });
  test("should should redirect to homepage", () => {
    jest.spyOn(axios, "delete");
    localStorage.setItem("username", "Kimaiyo");
    localStorage.setItem("token", "token");
    const history = {
      push: jest.fn()
    };
    axios.delete.mockImplementation(() => Promise.resolve({ status: 204 }));
    const deleteArticle = jest.fn(() => Promise.resolve({ status: 204 }));
    const wrapper = setup({ article, deleteArticle, history });
    wrapper
      .instance()
      .handleDelete("data")()
      .then(() => {
        expect(history.push).toBeCalledWith("/");
      });
  });

  test("Handle mouse up", () => {
    window.getSelection = jest.fn().mockImplementation(() => {
      return {
        getRangeAt: () => {
          return "String";
        },
        getBoundingClientRect: () => {
          return { width: 100 };
        }
      };
    });
    document.getBoundingClientRect = jest.fn().mockImplementation(() => {
      return { width: 100 };
    });
    localStorage.setItem("username", "Kimaiyo");
    localStorage.setItem("token", "token");
    const hideCommentBox = jest.fn();
    const wrapper = setup({ article, hideCommentBox, window });
    const viewArticle = findByTestAttr(wrapper, "test-viewarticle");
    console.log(viewArticle);
  });

  test("should handle handleMouseUp()", () => {
    global.document = {
      getElementById: id => {
        return {
          removeAttribute: p => p
        };
      },
      selection: {
        type: "Control",
        createRange: () => {
          return {
            text: ""
          };
        }
      }
    };
    // global.document.selection.type = "Control"

    var z = document.createElement("p"); // is a node
    z.innerHTML = "test satu dua tiga";
    global.window.getSelection = () => {
      return {
        toString: p => "jh",
        getRangeAt: p => {
          return {
            getBoundingClientRect: p => {
              return {
                top: 10,
                bottom: 10,
                right: 10,
                left: 10
              };
            },
            cloneRange: p => {
              return {
                insertNode: () => p
              };
            },
            extractContents: () => z
          };
        },
        removeAllRanges: p => p,
        addRange: p => p
      };
    };

    const wrapper = setup({
      article,
      hideCommentBox: jest.fn(),
      highlightText: jest.fn()
    });

    wrapper.instance().handleMouseUp({
      preventDefault: jest.fn()
    });
  });
});
