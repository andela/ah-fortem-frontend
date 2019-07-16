import actionTypes from "../../../actions/types";
import commentsReducer from "../comments";

/**
 *
 * @param {object} action - object that specifies the action to be applied 2the comments obj
 * @param {any} defaultState - can have an object or undefined, will be passed as initialState
 * @returns {object} - new reducer object with applied action
 */
const reuseableCommentsReducer = (action, defaultState = undefined) =>
  commentsReducer(defaultState, action);

describe("commentsReducer Functionality", () => {
  const comment = {
    body: "A new comment is here",
    id: 359
  };

  const recurringCommentsArray = {
    comments: [comment]
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
        type: actionTypes.CREATE_COMMENT,
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
        type: actionTypes.SET_LOADING_COMMENTS
      })
    ).toEqual({
      comments: [],
      isLoading: true
    });
    expect(
      reuseableCommentsReducer({
        type: actionTypes.REMOVE_LOADING_COMMENTS
      })
    ).toEqual({
      comments: [],
      isLoading: false
    });
  });

  test("should add new comment to the list of comments present", () => {
    expect(
      reuseableCommentsReducer({
        type: actionTypes.SET_COMMENTS,
        payload: [comment]
      })
    ).toEqual({
      comments: [comment],
      isLoading: false
    });
  });

  test("should remove a comment from the list of comments if the delete comment is called", () => {
    expect(
      reuseableCommentsReducer(
        {
          type: actionTypes.DELETE_COMMENT,
          payload: comment.id
        },
        { ...recurringCommentsArray }
      ).comments
    ).toEqual([]);
  });

  test("should edit a comment when EDIT_COMMENT is hit", () => {
    const body = "A new comment";
    const additionalComment = { id: 12, body: "Old" };
    expect(
      reuseableCommentsReducer(
        {
          type: actionTypes.EDIT_COMMENT,
          payload: {
            id: comment.id,
            body: body
          }
        },
        {
          comments: [
            { ...recurringCommentsArray.comments[0] },
            additionalComment
          ]
        }
      ).comments
    ).toEqual([{ body, id: comment.id }, additionalComment]);
  });
});
