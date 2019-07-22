import { searchReducer } from "../";

describe("searchReducer tests", () => {
  test("should return default state on initialLoad", () => {
    expect(
      searchReducer(undefined, {
        type: "REDUX_LOAD"
      })
    ).toEqual({
      isLoading: false,
      searchResults: {
        count: 0,
        articles: [],
        links: {}
      }
    });
  });
  test("should toggle isLoading prop", () => {
    expect(
      searchReducer(null, {
        type: "LOAD_SEARCH_RESULTS"
      }).isLoading
    ).toBe(true);
    expect(
      searchReducer(null, {
        type: "FINISH_LOADING_SEARCH_RESULTS"
      }).isLoading
    ).toBe(false);
  });
  test("should set search results to the state", () => {
    const results = {
      articles: [],
      count: 1,
      links: {}
    };

    expect(
      searchReducer(undefined, {
        type: "SET_SEARCH_RESULTS",
        payload: results
      }).searchResults
    ).toEqual(results);
  });
});
