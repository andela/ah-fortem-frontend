import React from "react";
import axios from 'axios'
import { shallow } from "enzyme";

import { UnconnectedPasswordReset } from "../Passwordreset";
import { findByTestAttr } from "../../../testutils";

const setUpPasswordReset = (props = {}) => shallow(<UnconnectedPasswordReset {...props} />);

jest.spyOn(axios, "post")

describe('<PasswordReset />', () => {
    test("Should render form when status state is ''", () => {
        const wrapper = setUpPasswordReset();
        wrapper.setState({ status: "" });
        const renderForm = findByTestAttr(wrapper, "renderform-test");

        expect(renderForm.length).toBe(1);
    });

    test("Should render success message component when status state is 200", () => {
        const wrapper = setUpPasswordReset();
        wrapper.setState({ status: 200 });
        const renderMessage = findByTestAttr(wrapper, "rendermessage-test");

        expect(renderMessage.length).toBe(1);
    });

    test('Input fields on change function', () => {
        const wrapper = setUpPasswordReset();
        const emailInputField = findByTestAttr(wrapper, "email-test");
        emailInputField.simulate("change", { persist: jest.fn(), target: { value: "testemail@gmail.com", name: "email" } });
        expect(wrapper.state("user")).toEqual({
            "email": "testemail@gmail.com"
        });
    });

    test('Handle submit function', () => {
        const wrapper = setUpPasswordReset();
        const res = Promise.resolve({ data: { status: 200 } })
        const apiCallsfn = jest.fn(() => res);
        axios.post.mockImplementation(() => res)

        wrapper.instance().handleSubmit(apiCallsfn)({
            preventDefault: jest.fn()
        }).then(() => {
            expect(wrapper.state("status")).toEqual(200)
        })
    });

    test('Handle submit function catch', () => {
        const res = Promise.reject({ response: { data: { error: "This is an error" } } });
        const apiCallsfn = jest.fn(() => res);
        axios.post.mockImplementation(() => res);
        const wrapper = setUpPasswordReset();

        wrapper.instance().handleSubmit(apiCallsfn)({
            preventDefault: jest.fn()
        }).then(() => {
            expect(wrapper.state()).toEqual({
                user: { email: '' },
                errors: { email: ['This is an error'] },
                resetbutton: { value: 'send', disabled: 'disabled' },
                status: ''
            })
        })
    });

    test("Handle errors", () => {
        const wrapper = setUpPasswordReset();
        wrapper.instance().handleChange({
            persist: () => { },
            target: {
                value: "brian@",
            }
        })
        expect(wrapper.state("errors")).toEqual({ "email": ["Email should be in the format emailusername@example.com"] })
    })


})