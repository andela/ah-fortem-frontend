import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';

import { UnconnectedResetPassWordConfirm } from '../ConfirmPasswordReset'
import { findByTestAttr } from "../../../testutils";

const setUpConfrimResetPassword = (props = {}) => shallow(<UnconnectedResetPassWordConfirm {...props} />);

jest.spyOn(axios, "patch");

describe('<ConfirmPasswordReset />', () => {
    test("Should render form without error", () => {
        const renderForm = findByTestAttr(setUpConfrimResetPassword(), "confirmpasswordreset-test");

        expect(renderForm.length).toBe(1);
    });

    test("Input fields on change function", () => {
        const wrapper = setUpConfrimResetPassword();
        const passwordField = findByTestAttr(wrapper, "password-test");
        const confirmPasswordField = findByTestAttr(wrapper, "confirmPassword-test");
        passwordField.simulate('change', { persist: jest.fn(), target: { value: "testpassword", name: "password" } });
        confirmPasswordField.simulate('change', { persist: jest.fn(), target: { value: "testpassword", name: "confirmPassword" } });
        expect(wrapper.state("user")).toEqual({
            "confirmPassword": "testpassword",
            "password": "testpassword",
        });
    });

    test("Handle submit function", () => {
        const ShowMessage = jest.fn();
        const history = {
            push: jest.fn()
        };
        const location = {
            search: jest.fn()
        }
        const res = Promise.resolve({ data: { status: 200 } });
        const apiCallsfn = jest.fn(() => res);
        axios.patch.mockImplementation(() => res);
        const wrapper = setUpConfrimResetPassword({ history, ShowMessage, location });

        wrapper.instance().handleSubmit(apiCallsfn)({
            preventDefault: jest.fn()
        }).then(() => {
            expect(history.push).toBeCalled();
            expect(ShowMessage).toHaveBeenCalled();
            expect(ShowMessage).toHaveBeenCalledWith("Password reset was successful plase login");
        });
    });

    test('should update component errors if passwords do not match', () => {
        const wrapper = setUpConfrimResetPassword();
        wrapper.instance().handleChange({
            persist: jest.fn(),
            target: {
                name: "password",
                value: "correct"
            }
        })
        wrapper.instance().handleErrors("confirmPassword", "")
        wrapper.instance().handleErrors("password", "correct")
        expect(wrapper.state().errors).toEqual(
            {
                "confirmPassword": [
                    "Passwords do not match",
                ]
            }
        );
    });


});