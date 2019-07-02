import { apiCalls } from "../axios";
import axios from "axios";

jest.spyOn(axios, "get");

describe("apiCalls", () => {
  test("Returns promise when axiosMethod is called", () => {
    const data = {};
    axios.get.mockImplementation(() => {
      return Promise.resolve({
        data
      });
    });
    apiCalls("get", "/test").then(apicall => {
      expect(apicall).toEqual({
        data: {}
      });
    });
  });
});
