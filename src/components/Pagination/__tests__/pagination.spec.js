import React from "react";
import { shallow } from "enzyme";

import Pagination from "../Pagination";
import renderer from "../../../testutils/renderer";

describe("Tests for Pagination Page", () => {
  const count = 1;
  const handleNewPagination = jest.fn();
  const active = 1;

  const setup = (
    props = { count, handleNewPagination, active },
    state = null
  ) => {
    return shallow(<Pagination {...props} />);
  };

  test("should render page without errors", () => {
    const wrapper = setup();
    renderer(wrapper, "test-page");
  });
});
