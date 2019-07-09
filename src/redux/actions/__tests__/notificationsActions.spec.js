import expect from "expect";
import WS from "jest-websocket-mock";
import { fetchNotifications } from "../notificationActions";
import { storeFactory } from "../../../testutils";
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
