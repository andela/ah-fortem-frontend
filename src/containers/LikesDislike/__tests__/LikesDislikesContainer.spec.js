import React from "react";

import { mount } from "enzyme";

import LikeDislike, { LikesDislikeContainer } from "../LikesDislikesContainer";
import { Provider } from "react-redux";
import { findByTestAttr } from "../../../testutils";
import { storeFactory } from "../../../testutils";
import axios from "axios";
localStorage.setItem("token", "token");
const data = {
  articles: {
    article: {
      id: 1,
      title: "This is to test like and diliks",
      description: "How thisngs work is amzing",
      image_url: "image_url",
      author: {
        username: "likeranddisliker",
        bio: "",
        image: "image.url"
      },
      created_at: "2019-03-23T08:43:31.592916Z",
      updated_at: "2019-02-23T08:23:31.592948Z",
      slug: "dlikwwwwr",
      avg_rating: 0,
      rating_count: 0,
      tags: [],
      favorited: true,
      favoritesCount: 4,
      read_time: "2 min read",
      flag: ""
    },
    likesCount: {
      dislikes: 0,
      likes: 0,
      total: 0,
      user: null
    }
  }
};
const store = storeFactory(data);
const updatedCount = {
  likesCount: {
    likes: 20,
    dislikes: 0,
    total: 20,
    user: "like"
  }
};

const setup = (props = {}) => {
  return mount(
    <Provider {...{ store }}>
      <LikeDislike {...props} />
    </Provider>
  );
};
describe("<LikeDislike />", () => {
  const getLikes = jest.fn(() => Promise.resolve(updatedCount));

  const props = {
    likesCount: {
      likes: 0,
      dislikes: 0,
      user: "like"
    },
    getLikes
  };

  test("should render Likesdislikes without errors", () => {
    jest.spyOn(axios, "get");
    axios.get.mockImplementation(() => Promise.resolve({}));
    const wrapperContainer = setup(props);
    const wrapper = wrapperContainer.find(LikesDislikeContainer);
    const dislike = findByTestAttr(wrapper, "dislike-btn");
    expect(dislike.length).toBe(1);
    wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        expect(getLikes).toBeCalled();
      });
  });
  test("Click like and dislike button makes api call with like action ", () => {
    jest.spyOn(axios, "post");
    jest.spyOn(axios, "delete");
    axios.post.mockImplementation(() => Promise.resolve(updatedCount));
    axios.delete.mockImplementation(() => Promise.resolve(updatedCount));

    const wrapper = setup({ props });
    const likeBtn = wrapper.find("#likebtn");

    likeBtn.simulate("click");
    expect(axios.post).toBeCalled();
    likeBtn.simulate("click");
    expect(axios.delete).toBeCalled();
    const dislikeBtn = wrapper.find("#dislikebtn");
    dislikeBtn.simulate("click");
    expect(axios.post).toBeCalled();
  });
});
