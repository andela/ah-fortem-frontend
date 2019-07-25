import React from "react";
import { mount } from "enzyme";
import renderer from "../../../testutils/renderer";

import ComponentsFailed from "../ComponentsFailedLoad";

describe("<ComponentsFailed />", () => {
  test("should render without errors", () => {
    const showArticleComments = jest.fn();
    renderer(
      mount(<ComponentsFailed {...{ showArticleComments }} />),
      "failed-to-load-comments"
    );
  });
});
