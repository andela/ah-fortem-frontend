import actionTypes from "../../actions/types";

import showCommentBoxReducer from "../showCommentBoxReducer";

describe("tests for show comment reducer", () => {
  test("Show comment redicer initial state should be display none", () => {
    const newState = showCommentBoxReducer(undefined, {});
    expect(newState).toEqual({ display: "none" });
  });

  test("Show comment should display block", () => {
    const newState = showCommentBoxReducer(undefined, {
      payload: { display: "block" },
      type: actionTypes.SHOW_COMMENT_BOX
    });
    expect(newState).toEqual({ display: "block" });
  });

  test("hide comment should display none", () => {
    const data = {
      type: actionTypes.HIDE_COMMENT_BOX,
      payload: { display: "none" }
    };
    const newState = showCommentBoxReducer(undefined, { data });

    expect(newState).toEqual({ display: "none" });
  });
});
