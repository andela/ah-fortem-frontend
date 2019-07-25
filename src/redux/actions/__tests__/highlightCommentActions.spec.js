import {
  highlightText,
  showCommentBox,
  hideCommentBox
} from "../HighlightCommentActions";

const dispatch = jest.fn();
const noneDisp = { display: "none" };
describe("Tests for highlight comment actions", () => {
  test("should return a function on highlightText action", () => {
    highlightText(noneDisp)(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      payload: noneDisp,
      type: "HIGHLIGHT"
    });
  });
  test("should a function for showcomment box", () => {
    showCommentBox({ display: "block" })(dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      payload: { display: "block" },
      type: "SHOW_COMMENT_BOX"
    });
  });
  test("should return a function for hidecomment box", () => {
    hideCommentBox(noneDisp)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      payload: noneDisp,
      type: "HIDE_COMMENT_BOX"
    });
  });
});
