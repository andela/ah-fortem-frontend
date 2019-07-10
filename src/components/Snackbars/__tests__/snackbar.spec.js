import React from "react";
import { shallow } from "enzyme";
import Snackbar from "../Snackbar";
jest.useFakeTimers();

const setUp = props => shallow(<Snackbar {...props} />);

describe("<Snackbar />", () => {
  test("should render snackbar without errors", () => {
    const dismiss = jest.fn();
    const wrapper = setUp({
      toast: {
        type: "success",
        message: "Yeeey It works",
        id: "123e"
      },
      dismiss
    });

    expect(wrapper.find(`[data-test="toast-message"]`).text()).toBe(
      "Yeeey It works"
    );
  });
  test("should render snackbar without errors", () => {
    const dismiss = jest.fn();
    const wrapper = setUp({
      toast: {
        type: "error",
        message: "Yeeey It works",
        id: "123e"
      },
      dismiss
    });

    const closeicon = wrapper.find(`[data-test="snackbar-closeicon"]`);
    closeicon.simulate("click");

    expect(dismiss).toHaveBeenCalled();
  });

  test(" Componentdidmount should call dismiss fn", () => {
    const dismiss = jest.fn();
    const wrapper = setUp({
      toast: {
        type: "success",
        message: "Yeeey It works",
        id: "123e"
      },
      dismiss
    });

    wrapper.instance().componentDidMount();
    wrapper.update();
    jest.runAllTimers();

    // Fast-forward until all timers have been executed
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(dismiss).toHaveBeenCalled();
  });
  test(" Componentdidmount should not call dismiss fn", () => {
    const dismiss = jest.fn();
    const wrapper = setUp({
      toast: {
        type: "success",
        message: "Yeeey It works",
        id: "123e"
      },
      dismiss
    });

    wrapper.setState({ dismissed: true });

    wrapper.instance().componentDidMount();
    jest.runAllTimers();

    // Fast-forward until all timers have been executed
    expect(dismiss).toHaveBeenCalledTimes(0);
  });
});
