import React from "react";
import { shallow } from "enzyme";

import axios from "axios";
import { findByTestAttr } from "../../../testutils";

import renderer from "../../../testutils/renderer";
import { PostArticle } from "../PostArticle";

jest.spyOn(axios, "post");

const setup = (props = {}) => {
  return shallow(<PostArticle {...props} />);
};

describe("Tests for Posting an article", () => {
  test("should render page without errors", () => {
    const wrapper = setup();

    renderer(wrapper, "post-test");
  });

  test("check title state of new article ", () => {
    const wrapper = setup();
    const titleinput = findByTestAttr(wrapper, "title-input");
    titleinput.simulate("change", {
      target: {
        value: "Kimaiyo's Article"
      }
    });

    expect(findByTestAttr(wrapper, "title-input").prop("value")).toBe(
      "Kimaiyo's Article"
    );
  });
  test("should call showMessage with success when a user creates article successfully", () => {
    const ShowMessage = jest.fn();
    const postArticle = jest.fn(() =>
      Promise.resolve({
        slug: "article-1"
      })
    );
    const history = {
      push: jest.fn()
    };
    axios.post.mockImplementation(() =>
      Promise.resolve({
        slug: "article-1"
      })
    );
    const wrapper = setup({ ShowMessage, postArticle, history });
    wrapper
      .instance()
      .createArticle({
        preventDefault: jest.fn()
      })
      .then(() => {
        expect(ShowMessage).toHaveBeenCalled();
      });
  });
  test("should setBody in state after calling handleBody", () => {
    const wrapper = setup();
    wrapper.instance().handleBody("New error");
    expect(wrapper.state().body).toBe("New error");
  });
  test("should call ShowMessage when error code is 500  ", () => {
    const ShowMessage = jest.fn();
    const postArticle = jest.fn(() =>
      Promise.reject({
        response: {
          status: 500
        }
      })
    );
    const history = {
      push: jest.fn()
    };
    axios.post.mockImplementation(() =>
      Promise.resolve({
        slug: "article-1"
      })
    );
    const wrapper = setup({ ShowMessage, postArticle, history });
    wrapper
      .instance()
      .createArticle({
        preventDefault: jest.fn()
      })
      .then(() => {
        expect(ShowMessage).toHaveBeenCalledWith({
          message: "Api Server error 500. Try sending the request again",
          type: "error"
        });
      });
  });
  test("should call ShowMessage with custom message provided when error is not 500", () => {
    const ShowMessage = jest.fn();
    const postArticle = jest.fn(() =>
      Promise.reject({
        response: {
          status: 400,
          data: {
            errors: {
              error: ["Something does not work"]
            }
          }
        }
      })
    );
    const history = {
      push: jest.fn()
    };
    axios.post.mockImplementation(() =>
      Promise.resolve({
        slug: "article-1"
      })
    );
    const wrapper = setup({ ShowMessage, postArticle, history });
    wrapper
      .instance()
      .createArticle({
        preventDefault: jest.fn()
      })
      .then(() => {
        expect(ShowMessage).toHaveBeenCalledWith({
          message: "Something does not work",
          type: "error"
        });
      });
  });
});
