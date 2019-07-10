import React from "react"

import { shallow } from "enzyme"

import Input from "../Input";

import { findByTestAttr } from "../../../testutils"

describe('<Input />', () => {
    test('should render input box without errors', () => {
        const wrapper = shallow(<Input data-test="basic-input" />);

        const inputbox = findByTestAttr(wrapper, "basic-input");

        expect(inputbox.length).toBe(1);
    })

})
