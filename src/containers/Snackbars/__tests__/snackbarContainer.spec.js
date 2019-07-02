import React from "react";
import { mount } from "enzyme";
import snackBarHoc, { unconnectedsnackBarHoc } from "../Snackbar";
import Snackbar from "../../../components/Snackbars/Snackbar.js";
import { storeFactory } from "../../../testutils";
import { Provider } from "react-redux";
jest.useFakeTimers();

const store = storeFactory({
  toasts: [
    {
      type: "success",
      message: "Yeeey It works",
      id: "123e"
    },
    {
      type: "success",
      message: "Yeeey It works",
      id: "123de"
    }
  ]
});

const Child = () => <div>Hello</div>;
const FullSnackBar = snackBarHoc(Child);

const UnconnectedSnackbar = unconnectedsnackBarHoc(Child);

const setUp = (props = {}) =>
  mount(
    <Provider {...{ store }}>
      <FullSnackBar {...props} />
    </Provider>
  );

const setUpUnconnectedSnackbar = (props = {}) =>
  mount(
    <Provider {...{ store }}>
      <UnconnectedSnackbar {...props} />
    </Provider>
  );

describe("Test snackBarComponent", () => {
  test("Snackbar Renders without fail", () => {
    const wrapper = setUp({});
    expect(wrapper.find(Snackbar).length).toBe(2);
  });
  test("should call onDismiss with the ID", () => {
    const DismissMessage = id => {
    };
    const wrapper = setUpUnconnectedSnackbar({ DismissMessage });
    const firstSnackbar = wrapper.find(Snackbar).first();
    const snackbarprops = firstSnackbar.props();
    snackbarprops.dismiss();
    expect(snackbarprops).toEqual({
      dismiss: expect.any(Function),
      toast: { type: "success", message: "Yeeey It works", id: "123e" }
    });
  });

  test("return 0 snackbar items if none is provided", () => {
    const store = storeFactory({});
    const wrapper = mount(
      <Provider {...{ store }}>
        <UnconnectedSnackbar />
      </Provider>
    );

    expect(wrapper.find(Snackbar).length).toBe(0);
  });
});
