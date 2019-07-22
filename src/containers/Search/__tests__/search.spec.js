import React from "react";
import { mount, shallow } from "enzyme";
import axios from "axios";

import { MemoryRouter, Route } from "react-router-dom";

import { ConnectedReduxSearchComponent, Search } from "../Search";
import FailedToFindArticles from "../../../components/Search/NoArticlesFound";

import { storeFactory } from "../../../testutils";

jest.spyOn(axios, "get");

const articles = [
  {
    slug: "123",
    title: "123",
    description: "321"
  }
];

const search = {
  searchResults: { count: 1, articles },
  isLoading: false
};

const defaultUrl = "/search?form&page_size=5&author=kimaiyo";
const setUp = (setUpProps = {}, url = defaultUrl) =>
  mount(
    <MemoryRouter initialEntries={[url]}>
      <Route
        path="/search"
        render={props => <Search {...props} {...setUpProps} />}
      />
    </MemoryRouter>
  );

describe("<Search />", () => {
  const fetchArticlesToBeSearched = jest.fn(() => Promise.resolve({}));
  test("should render Search without error and display results", () => {
    const defaultProps = {
      fetchArticlesToBeSearched,
      search
    };
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          articles: articles
        }
      })
    );
    const formwrapper = setUp({ ...defaultProps });

    expect(formwrapper.exists()).toBe(true);
    expect(setUp({ ...defaultProps }, "/search?s=responsive").exists()).toBe(
      true
    );

    const wrapperWithPage = setUp(
      { ...defaultProps },
      "/search?author=kimaiyo&page=3&page_size=1&"
    );

    expect(wrapperWithPage.exists()).toBe(true);
  });

  test("should render Child component well & it should update state", () => {
    const history = {
      push: jest.fn()
    };
    const childWrapper = shallow(
      <Search
        location={{
          search: defaultUrl
        }}
        history={history}
        fetchArticlesToBeSearched={fetchArticlesToBeSearched}
        search={{ ...search, isLoading: true }}
      />
    );

    childWrapper.setProps({
      search
    });
    childWrapper.instance().handleToggleFilter();

    // handle pagination
    childWrapper.instance().fetchNextOrPreviousPage(3)();
    expect(history.push).toBeCalled();
    childWrapper.instance().componentDidUpdate({
      ...{
        location: {
          search: ""
        }
      }
    });
    // handle errors
    childWrapper.setProps({
      search: { ...search, searchResults: { articles: [], isLoading: false } }
    });
    expect(childWrapper.find(FailedToFindArticles).length).toBe(1);
  });

  test("should render correctly if connected to redux", () => {
    const store = storeFactory({
      search
    });
    const connectedWrapper = shallow(
      <ConnectedReduxSearchComponent {...{ store }} />
    );
    expect(connectedWrapper.exists()).toBe(true);
  });
});
