import { findByTestAttr } from "./index";

const simulator = (wrapper, tag) => {
  const editable = findByTestAttr(wrapper, tag);
  editable.simulate("change", {
    target: {
      value: "Kimaiyo's Article"
    }
  });

  expect(findByTestAttr(wrapper, tag).prop("value")).toBe("Kimaiyo's Article");
};

export default simulator;
