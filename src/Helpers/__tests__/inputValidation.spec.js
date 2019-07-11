import { validate } from "../inputValidation";

describe('Validate Input', () => {
    test("Should return '' if username is valid", () => {
        const value = "testuser";
        expect(validate('username', value)).toEqual(false);
    });
    test("Should return error message for invalid usename", () => {
        const value = "";
        expect(validate('username', value)).toEqual('Username should have at least 3 letters');
    });
    test("Should return '' if password is valid", () => {
        const value = "@validPassword23";
        expect(validate('password', value)).toEqual('Should only contain alphanumerics')
    });
    test("Should return error message for invalid password", () => {
        const value = "pass";
        expect(validate('password', value)).toEqual(false);
    });
    test("Should return error message for invalid email address", () => {
        const value = "invalidemail";
        expect(validate('email', value)).toEqual('Email should be in the format emailusername@example.com');
    });
    test("Should return '' if email address is valid", () => {
        const value = "validemail@example.com";
        expect(validate('email', value)).toEqual(false);
    });
    test("Should return error if passwords don't match", () => {
        const value = "wrongpassword";
        const toEqual = "wrightpassword";

        expect(validate('confirmPassword', value, toEqual)).toEqual('Passwords do not match');
    });
    test("Should return false if passwords match", () => {
        const value = "wrightpassword";
        const toEqual = "wrightpassword";
        expect(validate('confirmPassword', value, toEqual)).toEqual(false);
    });
})