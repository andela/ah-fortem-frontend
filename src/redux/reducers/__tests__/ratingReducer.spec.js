import reducer from "../ratingReducer";
import actionTypes from "../../actions/types";

describe("Rating reducer", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(0);
  });

  test("should handle POST_RATING", () => {
    expect(
      reducer(0, {
        type: actionTypes.POST_RATING,
        payload: 2
      })
    ).toEqual(2);
  });
});
