import axios from "axios";

import { storeFactory } from "../../../../testutils";
import { fetchArticlesToBeSearched } from "../searchActions";

jest.spyOn(axios, "get");
const data = {
  links: {
    next: "http:://api.com",
    prev: null
  }
};
describe("fetchArticlesToBeSearched()", () => {
  const store = storeFactory();
  test("should update state when search results are fetched", () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data
      })
    );
    store.dispatch(fetchArticlesToBeSearched("url")).then(() => {
      const newState = store.getState();
      expect(newState.search.searchResults).toEqual(data);
    });
  });
  test("should update errors State if failed to load", () => {
    const callback = jest.fn();
    axios.get.mockImplementation(() => Promise.reject({}));
    store.dispatch(fetchArticlesToBeSearched("url", callback)).then(() => {
      expect(store.getState().toasts.length).toBe(1);
      expect(callback).toBeCalled();
    });
  });
});
