import MessageReducer from "../SnackBarReducer";

describe("SnackBarReducer", () => {
  test("", () => {
    const action = {
      payload: { message: "Well this is a success message", type: "success" },
      type: "DISPLAYMESSAGE"
    };

    const state = MessageReducer([], action);
    expect(state.length).toEqual(1);
    const action2 = {
      payload: { message: "Well this is an error message", type: "error" },
      type: "DISPLAYMESSAGE"
    };
    const state2 = MessageReducer(state, action2);
    expect(state2.length).toEqual(2);

    const removeId = state2[0].id;
    const removeAction = {
      type: "DISMISSMESSAGE",
      payload: removeId
    };
    const state3 = MessageReducer(state2, removeAction);
    expect(state3.length).toEqual(1);
  });
});
