import React from "react";

import { shallow } from "enzyme";

import Button from "../Button";

import { findByTestAttr } from "../../../testutils";


describe('<Button />', () => {
    test('should render button without errors', () => {
        const wrapper = shallow(<Button data-test="basic-button" />);

        const button = findByTestAttr(wrapper, "basic-button");

        expect(button.length).toBe(1);
    })
})