import React from "react";
import { shallow } from "enzyme";

import axios from "axios";

import { findByTestAttr, storeFactory } from "../../../testutils";
import Imageupload from "../Imageupload";

jest.spyOn(axios, "post");

/**
 * @param {object} props - props to be passed to the Imageupload component
 * @returns {ShallowWrapper} - enzyme wrapper
 */
const setUp = props => shallow(<Imageupload {...props} />).dive();

describe("<Imageupload />", () => {
  test("should render without errors in both sending / not sending state", () => {
    const store = storeFactory();

    const wrapper = setUp({ store });
    const filejsx = findByTestAttr(wrapper, "file-label");
    expect(filejsx.exists()).toBe(true);
    wrapper.setState({
      sending: true
    });
    const uploading = findByTestAttr(wrapper, "uploading-file");
    expect(uploading.exists()).toBe(true);
  });

  test("should call uploadedImageUrl when upload", done => {
    const uploadedImageUrl = url => {
      expect(url).toBe("https://i.imgur.com/Cg93KXU.jpg");
      done();
    };
    const store = storeFactory();

    const wrapper = setUp({ uploadedImageUrl, store });
    const responsedata = {
      data: {
        id: "Cg93KXU",
        title: null,
        description: null,
        datetime: 1562573624,
        type: "image/jpeg",
        in_gallery: false,
        deletehash: "lDPXyKJBeMm7VMk",
        name: "Cohort_38-5.jpg",
        link: "https://i.imgur.com/Cg93KXU.jpg"
      },
      success: true,
      status: 200
    };

    axios.post.mockImplementation(() =>
      Promise.resolve({ data: responsedata })
    );

    // call the handleUploadfile functionality
    wrapper.instance().handleUploadFile({
      target: {
        files: [
          {
            name: "filename"
          }
        ]
      }
    });
  });
  test("should setSendingStateTo false when an error is encountered", () => {
    const store = storeFactory();

    const wrapper = setUp({ store });
    axios.post.mockImplementation(() =>
      Promise.reject({
        data: {
          error: ""
        }
      })
    );

    // call the handleUploadfile functionality
    wrapper
      .instance()
      .handleUploadFile({
        target: {
          files: [
            {
              name: "filename"
            }
          ]
        }
      })
      .then(() => {
        // we expect the sending prop to be set to fals

        expect(wrapper.state()).toEqual({
          sending: false
        });
      });
  });
});
