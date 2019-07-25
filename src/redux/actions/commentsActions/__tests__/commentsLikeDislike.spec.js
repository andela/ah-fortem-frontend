import axios from "axios";
import { storeFactory } from "../../../../testutils";

import {
  postCommentLikes,
  deleteCommentLike
} from "../CommentsLikeDislikeActions";

const like = {
  action: "like"
};

const com = {
  id: 2,
  body: "the best",
  likesCount: {
    likes: 1,
    dislikes: 1,
    total: 2
  }
};

const count = {
  likesCount: {
    likes: 1,
    dislikes: 1,
    total: 2
  }
};
const store = storeFactory();
localStorage.setItem("token", "token");

jest.spyOn(axios, "post");
jest.spyOn(axios, "delete");

const resData = (func, action) => {
  const dispatcher =
    func === postCommentLikes
      ? store.dispatch(func(action, 1))
      : store.dispatch(func(1, "null", action));
  dispatcher.then(() => {
    const newState = store.getState();
    expect(newState.commments).toEqual({
      comments: [com],
      isLoading: false
    });
  });
};

describe("Tests for liking and disliking comments actions", () => {
  test("should send a post request when postCommentLikes is called", () => {
    axios.post.mockImplementation(() => Promise.resolve({ count }));
    resData(postCommentLikes, like);
  });

  test("should send a delete request when deleteCommentLikes is called", () => {
    axios.delete.mockImplementation(() =>
      Promise.resolve("deleted successfully")
    );
    resData(deleteCommentLike, "like");
  });
});
