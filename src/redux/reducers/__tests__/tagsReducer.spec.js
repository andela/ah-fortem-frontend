import actionTypes from "../../actions/types";
import tagReducer from "../tagsReducer";
const { TAGS } = actionTypes;

it("should set state to a list of tags", () => {
  const tagList = ["test", "tags"];
  const newState = tagReducer(undefined, {
    type: TAGS,
    tags: tagList
  });
  expect(newState).toEqual(tagList);
});
