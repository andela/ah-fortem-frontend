import React from "react";
import axios from "axios";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../testutils";
import renderer from "../../../testutils/renderer";
import { ShareBar } from "../ShareArticle";

jest.spyOn(axios, "get");
jest.spyOn(axios, "post");

const article = {
  id: 3,
  image_url: "this_url",
  slug: "bulls-eye",
  avg_rating: 0,
  author: {
    username: "Bossman",
    image: ""
  },
  body: "Get yours and go with it",
  title: "bulls eye",
  description: "This is the description",
  tags: ["tags", "this"],
  read_time: "1 min read"
};

const ShowMessage = jest.fn();
const setup = (props = { article, ShowMessage }) => {
  return shallow(<ShareBar {...props} />);
};
describe("", () => {
  afterEach(() => {
    localStorage.clear();
  });
  test("should render share bar without errors", () => {
    const wrapper = setup({ article });
    renderer(wrapper, "share-bar");
  });

  test("handleSubmitShare should close modal & send email  ", () => {
    localStorage.setItem("token", "token");
    axios.post.mockImplementation(() => Promise.resolve({}));

    const wrapper = setup();
    // open the modal
    wrapper.setState({ openmodal: true });
    wrapper.instance().handleSubmitShare({
      preventDefault: () => {}
    });
    expect(wrapper.state().openmodal).toBe(false);
  });
  test("handleShareSocial should share articles  ", done => {
    const data = {
      message: "",
      shared_link: `${process.env.BACKEND_LINK}/articles/new-article`
    };
    axios.post.mockImplementation(() => Promise.resolve({ data }));
    global.window.open = url => {
      expect(url).toBe(`${process.env.FRONTEND_LINK}/articles/new-article`);
      done();
    };
    const wrapper = setup();
    // open the modal
    findByTestAttr(wrapper, "facebook-social").simulate("click");
    wrapper.instance().handleShareSocial("new-article", "twitter");
  });
  test("handleEmailChange", () => {
    const wrapper = setup();
    wrapper.instance().handleEmailChange({
      target: {
        value: "an@gmail.com"
      }
    });
  });
  test("email modal shouldn't render if user isn't logged in", () => {
    const wrapper = setup();
    wrapper.instance().toggleModal({});
    expect(ShowMessage).toHaveBeenCalled();
  });
});
