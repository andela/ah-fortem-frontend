import actionTypes from "../../actions/types";

import highLightCommentReducer from "../highlightCommentReducer";

describe("test for highlight comment reducer", () => {
  test("Highlight comment initial state should be empty", () => {
    const newState = highLightCommentReducer(undefined, {});
    expect(newState).toEqual({});
  });

  test("Should return display", () => {
    const newState = highLightCommentReducer(undefined, {
      type: actionTypes.HIGHLIGHT,
      payload: { display: "block" }
    });
    expect(newState).toEqual({ display: "block" });
  });
});
