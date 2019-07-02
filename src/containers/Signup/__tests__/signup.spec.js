import React from "react";

import { shallow } from "enzyme";
import { StaticRouter } from "react-router-dom";

import Signup, { UnconnectedSignup } from "../Signup";

import { findByTestAttr } from "../../../testutils";

const setup = (props = {}) => {
    return shallow(
        <StaticRouter>
            <Signup {...props} />
        </StaticRouter>
    ).dive().dive().dive().dive().dive()
}

const setUpUnconnectedSignup = (props = {}) => shallow(<UnconnectedSignup {...props} />)

describe('<Signup />', () => {
    test('Should render signup without errors', () => {
        const wrapper = setup();

        const signupform = findByTestAttr(wrapper, "signup-test");

        expect(signupform.length).toBe(1);
    });

    test('Input fields onchange function', () => {
        const wrapper = setup();

        const emailfield = findByTestAttr(wrapper, "email-test").first()
        const usernamefield = findByTestAttr(wrapper, "username-test").first()
        const passwordfield = findByTestAttr(wrapper, "password-test").first()
        const confirmPasswordfield = findByTestAttr(wrapper, "confirmPassword-test").first()
        emailfield.simulate("change", { persist: jest.fn(), target: { value: "testemail", name: "email" } });
        usernamefield.simulate("change", { persist: jest.fn(), target: { value: "testusername", name: "username" } });
        passwordfield.simulate("change", { persist: jest.fn(), target: { value: "testpassword", name: "password" } });
        confirmPasswordfield.simulate("change", { persist: jest.fn(), target: { value: "testpassword", name: "confirmPassword" } });
        expect(wrapper.state("user")).toEqual({
            "email": "testemail",
            "username": "testusername",
            "password": "testpassword",
            "confirmPassword": "testpassword"
        })
    });

    test('Handle submit function', () => {
        const history = {
            push: jest.fn()
        }
        const wrapper = setUpUnconnectedSignup({ history });
        const apiCallsfn = jest.fn(() => Promise.resolve({ status: 201 }))
        wrapper.instance().handleSubmit(apiCallsfn)({
            preventDefault: jest.fn()
        }).then(() => {
            expect(history.push).toBeCalled()
        })

    });

    test('Test submit error', () => {
        const wrapper = setUpUnconnectedSignup();
        const apiCallsfn = jest.fn(() => Promise.reject({
            status: 400, response: {
                data: {
                    errors: {
                        "email": [
                            "This field may not be blank."
                        ],
                        "username": [
                            "This field may not be blank."
                        ],
                        "password": [
                            "This field may not be blank."
                        ]
                    }
                }
            }
        }))
        wrapper.instance().handleSubmit(apiCallsfn)({
            preventDefault: jest.fn()
        }).then(() => {
            expect(wrapper.state().errors).toEqual({
                "email": [
                    "This field may not be blank."
                ],
                "username": [
                    "This field may not be blank."
                ],
                "password": [
                    "This field may not be blank."
                ]
            })
        })
    });

    test("Passwords don;t match", () => {
        const wrapper = setup();
        const passwordfield = findByTestAttr(wrapper, "password-test").first();
        const confirmPasswordfield = findByTestAttr(wrapper, "confirmPassword-test").first()
        const apiCallsfn = jest.fn(() => Promise.resolve({ status: 201 }));
        passwordfield.simulate("change", { persist: jest.fn(), target: { value: "testpassword", name: "password" } });
        confirmPasswordfield.simulate("change", { persist: jest.fn(), target: { value: "wrongpassword", name: "confirmPassword" } });
        wrapper.instance().handleSubmit(apiCallsfn)({
            preventDefault: jest.fn()
        });
        expect(wrapper.state("errors")).toEqual({ confirmPassword: ["Passwords don't match"]});
    });
})