import reducer from "../notifications";
import actionTypes from "../../actions/types";

describe("notifications reducer reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it("should handle GET_NOTIFICATIONS", () => {
    expect(
      reducer([], {
        type: actionTypes.GET_NOTIFICATIONS,
        payload: "New article from bnjugewriters@gmail.com named edited title"
      })
    ).toEqual(["New article from bnjugewriters@gmail.com named edited title"]);
  });
});
