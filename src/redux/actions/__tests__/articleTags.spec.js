import axios from "axios";
import { storeFactory } from "../../../testutils/index";
import { setTags, fetchTags } from "../articleTags";
import types from "../types";

jest.spyOn(axios, "get");

describe("Tag actions", () => {
  it("dispatches GET_TAGS action and returns list of tags", () => {
    const tags = ["when", "they", "see", "us"];
    const store = storeFactory({
      tags: ["when", "they", "see", "us"]
    });
    axios.get.mockImplementation(() => Promise.resolve({ tags }));
    return store.dispatch(fetchTags()).then(() => {
      expect(store.getState().tags).toEqual(["when", "they", "see", "us"]);
    });
  });
  it("setTags should return an object with type and tags as object properties", () => {
    const result = setTags([]);

    expect(result).toEqual({
      type: types.TAGS,
      tags: []
    });
  });
});
