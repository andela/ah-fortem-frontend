import imageupload from "../imageupload";
import axios from "axios";

jest.spyOn(axios, "post");

describe("imageupload fn()", () => {
  test("Test the imageupload functionality", () => {
    const responsedata = {
      data: {
        link: "https://i.imgur.com/TEVINLINKISHERE.jpg"
      },
      success: true,
      status: 200
    };

    axios.post.mockImplementation(() => Promise.resolve(responsedata));
    imageupload({}).then(data => {
      expect(data).toEqual(responsedata);
    });
  });
});
