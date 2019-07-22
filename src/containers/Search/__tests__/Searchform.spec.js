import React from "react";

import { shallow } from "enzyme";

import { Search } from "../SearchForm";

const setUp = (props = {}) => shallow(<Search {...props} />);

describe("<Searchform />", () => {
  test("should update state accordingly ", () => {
    const title = "wen ticle";
    const authorName = "pendragon";
    const history = {
      push: jest.fn()
    };
    const callback = jest.fn();
    const wrapper = setUp({
      fullPage: true,
      defaultTags: "tag1",
      defaultTitle: "title1",
      defaultPageSize: 12,
      history,
      callback
    });

    wrapper.instance().handleStateChange({
      target: {
        name: "title",
        value: title
      }
    });
    expect(wrapper.state().title).toBe(title);
    // update state when SubmitAuthor is called
    wrapper.instance().handleSubmitUsername(authorName);
    expect(wrapper.state().author).toBe(authorName);
    wrapper.instance().handleSearchRedirect();
    expect(history.push).toBeCalledWith(
      "/search?form&page_size=12&title=wen ticle&author=pendragon&tags=tag1"
    );
    expect(callback).toHaveBeenCalled();
  });

  test("should call the handleRedirect with blank fields if state is not filled", () => {
    const wrapper = setUp({});
    expect(wrapper.instance().handleCreateRedirectLink()).toBe("/search?form");
  });
});
