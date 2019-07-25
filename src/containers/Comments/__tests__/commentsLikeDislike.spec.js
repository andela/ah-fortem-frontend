import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";

import { storeFactory } from "../../../testutils";
import { findByTestAttr } from "../../../testutils";
import renderer from "../../../testutils/renderer";
import CommentLikeDislike, {
  CommentsLikeDislike
} from "../CommentsLikeDislike";

describe("Tests for CommentLikeDislike component", () => {
  const postCommentLikes = jest.fn();
  const deleteCommentLike = jest.fn();
  const comment = {
    id: 3,
    created_at: "2019-07-15T17:25:32.402061Z",
    updated_at: "2019-07-18T08:41:54.741256Z",
    body: "body",
    user: {
      username: "tev",
      bio: "when .",
      image: "https://i.imgur.com/ztzqvbF.png"
    },
    highlighted_text: null,
    article: "responsive-images",
    likesCount: {
      likes: 1,
      dislikes: 0,
      total: 1,
      userAction: "commentLike"
    }
  };
  const props = { comment, postCommentLikes, deleteCommentLike };
  const setup = (state = null) => {
    return shallow(<CommentsLikeDislike {...props} />);
  };

  const wrapper = setup();

  test("should render without errors", () => {
    renderer(wrapper, "test-btn");
  });

  test("should call handleChange when a button is clicked", () => {
    const testBtn = findByTestAttr(wrapper, "testBtn");
    const delTestBtn = findByTestAttr(wrapper, "delTestBtn");
    testBtn.simulate("click");
    expect(postCommentLikes).toHaveBeenCalled();
    testBtn.simulate("click");
    expect(deleteCommentLike).toHaveBeenCalled();
    delTestBtn.simulate("click");
    expect(postCommentLikes).toHaveBeenCalled();
  });

  test("should call componentDidMount when rendering component", () => {
    wrapper.instance().componentDidMount();
    expect(wrapper.state("commentLike")).toEqual({
      className: "blue-text",
      clicked: true
    });
  });

  test("should call mapStateToProps on a connected CommentLikeDislike component", () => {
    const store = storeFactory();
    const conWrapper = mount(
      <Provider {...{ store }}>
        <CommentLikeDislike {...props} />
      </Provider>
    );

    renderer(conWrapper, "test-btn");
  });
});
