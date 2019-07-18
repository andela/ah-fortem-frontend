import React from "react";
import { shallow } from "enzyme";
import renderer from "../../../testutils/renderer";

import ComponentsFailed from "../ComponentsFailedLoad";

describe("<ComponentsFailed />", () => {
  test("should render without errors", () => {
    const showArticleComments = jest.fn();
    renderer(
      shallow(<ComponentsFailed {...{ showArticleComments }} />),
      "failed-to-load-comments"
    );
  });
});
