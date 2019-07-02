import {
  getProfile,
  saveProfileInfo,
  filterOutBlanks
} from "../profileActions";
import { storeFactory } from "../../../../testutils";
import axios from "axios";

jest.spyOn(axios, "get");
jest.spyOn(axios, "put");

const defaultprofile = username => ({
  data: {
    profile: {
      image: "",
      bio: "",
      id: 4,
      username,
      firstname: "",
      following: false,
      lastname: "",
      fullname: " "
    }
  }
});

/**
 *
 * @param {Object} store - redux store
 * @param {string} username - a users username
 */
const assertUserName = (store, username) => {
  const newState = store.getState();
  expect(newState.profile.data.username).toEqual(username);
};

describe("getProfile fn", () => {
  test("should call axios when provided with username", () => {
    const store = storeFactory();
    axios.get.mockImplementation(() =>
      Promise.resolve({
        ...defaultprofile("bnjunge")
      })
    );
    store.dispatch(getProfile("bnjunge")).then(() => {
      assertUserName(store, "bnjunge");
    });
  });
  test("should set SETOWNERSTATUS to true if logged in user is viewing their own profiles", () => {
    // set a user to be logged in
    localStorage.setItem("token", "usertoken");
    localStorage.setItem("username", "tev");
    const store = storeFactory();
    axios.get.mockImplementation(() =>
      Promise.resolve({
        ...defaultprofile("tev")
      })
    );
    store.dispatch(getProfile("tev")).then(() => {
      assertUserName(store, "tev");
    });
  });
});

describe("saveProfileInfo fn", () => {
  test("should update profile in state with new data provided", () => {
    axios.put.mockImplementation(() => Promise.resolve({}));
    const store = storeFactory({
      profile: {
        data: {
          firstname: "tev"
        },
        isLoading: false
      }
    });

    store
      .dispatch(
        saveProfileInfo({
          firstname: "tevinho"
        })
      )
      .then(() => {
        const state = store.getState();
        expect(state.toasts.length).toBe(1);
        expect(state.profile).toEqual({
          data: {
            firstname: "tevinho"
          },
          isLoading: false
        });
      });
  });
  test("should call Showmessage with an error message if the operation failed", () => {
    axios.put.mockImplementation(() => Promise.reject({}));
    const store = storeFactory({
      profile: {
        data: {
          firstname: "tev"
        },
        isLoading: false
      }
    });

    store
      .dispatch(
        saveProfileInfo({
          firstname: "tevinho"
        })
      )
      .then(() => {
        const state = store.getState();
        expect(state.toasts.length).toBe(1);
      });
  });
});

const errorsFn = status => ({
  response: {
    status,
    data: {
      error: "Profile not found"
    }
  }
});

describe("Handling errors on getProfile fn", () => {
  test("should call history.push when error is a 400", () => {
    const history = {
      push: jest.fn()
    };

    const store = storeFactory();
    axios.get.mockImplementation(() =>
      Promise.reject({
        ...errorsFn(400)
      })
    );
    store.dispatch(getProfile("tev", history)).then(() => {
      expect(history.push).toBeCalled();
    });
  });
  test("should update the errors object with a new message when a 500 error is hit", () => {
    const history = {
      push: jest.fn()
    };

    const store = storeFactory();
    axios.get.mockImplementation(() =>
      Promise.reject({
        ...errorsFn(500)
      })
    );
    store.dispatch(getProfile("tev", history)).then(() => {
      const state = store.getState();
      expect(state.toasts.length).toBe(1);
    });
  });
});

describe("filterOutBlanks fn", () => {
  test("should filter out object values that are empty", () => {
    let temp1 = {
      image: "",
      firstname: "TEVIN",
      lastname: "GACHAGUA",
      bio: ""
    };

    expect(filterOutBlanks(temp1)).toEqual({
      firstname: "TEVIN",
      lastname: "GACHAGUA"
    });
  });
});
