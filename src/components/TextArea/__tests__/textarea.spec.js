import React from "react";
import { shallow } from "enzyme";

import renderer from "../../../testutils/renderer";

import Textarea from "../Textarea";

describe("<Textarea />", () => {
  test("should render text area without errors", () => {
    const wrapper = shallow(<Textarea id="textarea" data-test="textarea" />);
    renderer(wrapper, "textarea");
  });
});
