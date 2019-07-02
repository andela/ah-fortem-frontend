import React from "react";
import { mount } from "enzyme";

import { findByTestAttr } from "../../../testutils";
import Modal from "../Modal";

/**
 *
 * @param {object} props - props passed down to the Modal Component
 * @returns Wrapper Component
 */
const setUp = props =>
  mount(
    <Modal {...props}>
      <h1>Hello there modal</h1>
    </Modal>
  );

describe("<Modal />", () => {
  test("Renders without error", () => {
    const wrapper = setUp({});

    expect(wrapper.find("h1").exists()).toBe(true);
  });

  test("should call onClose when modal-close icon is clicked", () => {
    const closeModal = jest.fn();
    const wrapper = setUp({
      closeModal
    });

    const closeicon = findByTestAttr(wrapper, "modal-close");

    closeicon.simulate("click");

    expect(closeModal).toBeCalled();
  });
});
