import axios from "axios";
import {
  getArticles,
  postArticle,
  viewArticle,
  updateArticle,
  deleteArticle,
  getArticlesByTags
} from "../articleActions";

import { storeFactory, snackBarError } from "../../../testutils";

const data = {
  article: {
    id: 1,
    title: "dragon rider",
    description: "Ever wonder how a dragon flies?",
    body: "Lets all breathe fire and fly",
    image_url: "image_url",
    author: {
      username: "Kimaiyo",
      bio: "",
      image: "image.url"
    },
    created_at: "2019-04-23T08:13:31.592916Z",
    updated_at: "2019-04-23T08:13:31.592948Z",
    slug: "dragon-rider",
    avg_rating: 0,
    rating_count: 0,
    tags: [],
    favorited: true,
    favoritesCount: 1,
    read_time: "1 min read",
    flag: ""
  }
};
const replyWithData = {
  article: null,
  articles: data.articles,
  loadingArticles: false,
  count: null,
  likesCount: {
    dislikes: 0,
    likes: 0,
    total: 0
  }
};
const store = storeFactory();
const token = "token";

const resdata = {
  article: {
    title: "Atlas V",
    description: "largest and most powerful rocket",
    body: "I think it took people to space",
    image_url: "image_url",
    tags: []
  }
};

const testfunc = (method, func) => {
  jest.spyOn(axios, method);
  if (method === "post") {
    axios.post.mockImplementation(() => Promise.resolve({ data }));
  } else if (method === "get") {
    axios.get.mockImplementation(() => Promise.resolve({ data }));
  } else {
    axios.put.mockImplementation(() => Promise.resolve({ data }));
  }
  return store.dispatch(func(resdata, token)).then(() => {
    const newState = store.getState();
    expect(newState.articles).toEqual({
      articles: [],
      article: data.article,
      count: null,
      loadingArticles: false
    });
  });
};

describe("Test for all Article Actions", () => {
  test("should fetch a single article", () => {
    testfunc("get", viewArticle);
  });

  test("should post an article ", () => {
    testfunc("post", postArticle);
  });
  test("should update an article", () => {
    testfunc("put", updateArticle);
  });

  test("should delete an article", () => {
    jest.spyOn(axios, "delete");
    const slug = "slug";

    axios.delete.mockImplementation(() =>
      Promise.resolve({
        status: 204
      })
    );

    store.dispatch(deleteArticle(slug, token)).then(data => {
      expect(data).toEqual({ status: 204 });
    });
  });

  test("should show error message snackbar", () => {
    snackBarError("get", getArticles, 1);
  });

  test("should fetch all the articles in the database", () => {
    jest.spyOn(axios, "get");
    const data = {
      articles: [
        {
          author: {
            username: "Kimaiyo",
            bio: "",
            image: ""
          },
          created_at: "2019-04-23T08:13:31.592916Z",
          updated_at: "2019-04-23T08:13:31.592948Z",
          slug: "dragon-rider",
          title: "falcon 9",
          description: "Best rocket booster ever",
          body: "Two of them make up the falcon heavy",
          image_url: "image_url",
          avg_rating: 0,
          rating_count: 0,
          tags: [],
          read_time: "1 min read"
        }
      ]
    };

    const store = storeFactory();

    axios.get.mockImplementation(() =>
      Promise.resolve({
        data
      })
    );

    return store.dispatch(getArticles()).then(() => {
      const newState = store.getState();

      expect(newState.articles).toEqual({
        article: null,
        articles: data.articles,
        loadingArticles: false,
        likesCount: {
          dislikes: 0,
          likes: 0,
          total: 0
        }
      });
    });
  });
});

const getArticlesOperation = () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: data
    })
  );
};

describe("Filterby tags", () => {
  const dispatchArticlesActions = (store, fn) => {
    getArticlesOperation();
    return store.dispatch(fn()).then(() => {
      return store.getState();
    });
  };
  const expectedState = newState => {
    return expect(newState.articles).toEqual(replyWithData);
  };
  test("should filter articles in the database by tags", () => {
    return dispatchArticlesActions(storeFactory(), getArticlesByTags).then(
      newState => {
        expectedState(newState);
      }
    );
  });
  test("should return error message if filter articles in the database by tags is unsuccessful", () => {
    axios.get.mockImplementation(() => Promise.reject({}));
    const store = storeFactory();
    return store.dispatch(getArticlesByTags()).then(() => {
      const newState = store.getState();

      expect(newState.articles).toEqual({
        article: null,
        articles: [],
        count: null,
        loadingArticles: true,
        likesCount: {
          dislikes: 0,
          likes: 0,
          total: 0
        }
      });
    });
  });
});
