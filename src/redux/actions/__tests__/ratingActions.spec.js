import axios from "axios";
import { setRating, getRating } from "../ratingActions";
import { storeFactory, snackBarError } from "../../../testutils";

const token = "token";
const data = { rating: 2 };
const id = 2;
const store = storeFactory();
const resdata = { rating: { rating: 2 } };

const expectedResult = () => {
  const newState = store.getState();
  return expect(newState.ratings).toEqual({
    ratings: resdata
  });
};

const testfunc = (method, func) => {
  let action;
  jest.spyOn(axios, method);

  if (method === "post") {
    axios.post.mockImplementation(() => Promise.resolve({ data }));
    action = store.dispatch(func(id, resdata, token)).then(() => {
      expectedResult();
    });
  } else if (method === "get") {
    axios.get.mockImplementation(() => Promise.resolve({ data }));
    action = store.dispatch(func(id, token)).then(() => {
      expectedResult();
    });
  }

  return action;
};

describe("Test article rating", () => {
  test("should post rating", () => {
    testfunc("post", setRating);
  });

  test("should show error snackbar on post rating", () => {
    snackBarError("post", setRating, 1);
  });

  test("should get rating", () => {
    testfunc("get", getRating);
  });

  test("should  show error snackbar on get rating", () => {
    snackBarError("get", getRating, 1);
  });
});
