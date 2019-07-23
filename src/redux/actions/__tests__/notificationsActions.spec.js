import expect from "expect";
import WS from "jest-websocket-mock";
import { fetchNotifications, optIn, optOut } from "../notificationActions";
import { storeFactory } from "../../../testutils";
import axios from "axios";

const token = "token";
const store = storeFactory();

const expectedToast = () => {
  const newState = store.getState();
  return expect(newState.toasts.length).toBe(1);
};

const testfunc = (method, func, type) => {
  let action;
  jest.spyOn(axios, method);

  if (method === "post") {
    axios.post.mockImplementation(() => Promise.resolve({}));
    action = store.dispatch(func(token, type)).then(() => {
      expectedToast();
    });
  } else if (method === "delete") {
    axios.delete.mockImplementation(() => Promise.resolve({ status: 204 }));
    action = store.dispatch(func(token, type)).then(data => {
      expect(data).toEqual({ status: 204 });
      expectedToast();
    });
  }

  return action;
};

describe("Test websockets", () => {
  const data = {
    data: {
      type: "notify",
      message: "New article from kimaiyo@gmail.com named event"
    }
  };
  jest.setTimeout(10000);
  let store;
  beforeEach(() => {
    store = storeFactory();
  });

  it("the mock server seamlessly handles JSON protocols", async () => {
    const server = new WS("ws://localhost:1235", { jsonProtocol: true });
    store.dispatch(fetchNotifications("ws://localhost:1235"));

    await server.connected;
    server.send(data.data);

    const state = store.getState();
    expect(state.notifications).toEqual([data.data]);

    server.close();
  });
});
describe("Notifications settings", () => {
  test("should opt in into app notifications", () => {
    testfunc("post", optIn, "in_app");
  });

  test("should opt in into email notifications", () => {
    testfunc("post", optIn, "email");
  });

  test("should opt out into in-app notifications", () => {
    testfunc("delete", optOut, "in_app");
  });

  test("should opt out into email notifications", () => {
    testfunc("delete", optOut, "email");
  });
});
