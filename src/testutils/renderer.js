import { findByTestAttr } from "./index";

const renderer = (wrapper, tag) => {
  const tested = findByTestAttr(wrapper, tag);
  expect(tested.length).toBe(1);
};

export default renderer;
