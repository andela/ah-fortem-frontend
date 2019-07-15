import actionTypes from "../../../actions/types";
import commentsReducer from "../comments";

const {
  CREATE_COMMENT,
  SET_LOADING_COMMENTS,
  REMOVE_LOADING_COMMENTS,
  SET_COMMENTS
} = actionTypes;

/**
 *
 * @param {object} action - object that specifies the action to be applied 2the comments obj
 * @returns {object} - new reducer object with applied action
 */
const reuseableCommentsReducer = action => commentsReducer(undefined, action);

describe("commentsReducer Functionality", () => {
  const comment = {
    body: "A new comment is here"
  };
  test("should return default state if nothing no relevant action is passed", () => {
    expect(
      reuseableCommentsReducer({
        type: "NOT_RELEVANT_TO_COMMENTS"
      })
    ).toEqual({
      comments: [],
      isLoading: false
    });
  });

  test("should add new comment to the comments array once a new comment is created", () => {
    expect(
      reuseableCommentsReducer({
        type: CREATE_COMMENT,
        payload: comment
      })
    ).toEqual({
      comments: [comment],
      isLoading: false
    });
  });

  test("should toggle loading prop", () => {
    expect(
      reuseableCommentsReducer({
        type: SET_LOADING_COMMENTS
      })
    ).toEqual({
      comments: [],
      isLoading: true
    });
    expect(
      reuseableCommentsReducer({
        type: REMOVE_LOADING_COMMENTS
      })
    ).toEqual({
      comments: [],
      isLoading: false
    });
  });

  test("should add new comment to the list of comments present", () => {
    expect(
      reuseableCommentsReducer({
        type: SET_COMMENTS,
        payload: [comment]
      })
    ).toEqual({
      comments: [comment],
      isLoading: false
    });
  });
});
