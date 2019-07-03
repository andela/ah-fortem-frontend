import { ShowMessage, DismissMessage } from "../SnackBarAction";
import { storeFactory } from "../../../testutils";

test("Dismiss message action", () => {
  const store = storeFactory({
    toasts: [
      {
        id: "34",
        message: "Hello There"
      },
      {
        id: "35",
        message: "Hello There Number 2"
      }
    ]
  });

  store.dispatch(DismissMessage("34"));
  const state = store.getState();
  expect(state.toasts.length).toBe(1);
});

test("ShowMessage Actions", () => {
  const action = ShowMessage("Well this is a success message");
  const dispatch = jest.fn();
  action(dispatch);
  expect(dispatch).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    payload: { message: "Well this is a success message", type: "success" },
    type: "DISPLAYMESSAGE"
  });
});
test("ShowMessage Actions with object", () => {
  const action = ShowMessage({
    message: "Well this is an error message",
    type: "error"
  });
  const dispatch = jest.fn();
  action(dispatch);
  expect(dispatch).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    payload: { message: "Well this is an error message", type: "error" },
    type: "DISPLAYMESSAGE"
  });
});
