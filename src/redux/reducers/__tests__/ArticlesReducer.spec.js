import actionTypes from "../../actions/types";
import ArticlesReducer from "../ArticlesReducer";
describe("ArticlesReducer reducer reducer", () => {
  const likesCount = {
    likes: 20,
    dislikes: 0,
    total: 20
  };

  it("should handle GET_NOTIFICATIONS", () => {
    expect(
      ArticlesReducer([], {
        type: actionTypes.UPDATE_LIKES,
        payload: likesCount
      })
    ).toEqual({ likesCount });
  });
});
