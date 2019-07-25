export const re = {
  email: /(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/,
  password: /^[a-zA-Z0-9_+-]*$/,
  username: /[a-zA-Z]{3,}_*[0-9_]*[a-zA-Z]*_*/,
  isEmpty: /\S/
};

let error = false;

export const validate = (type, value, toEqual = null) =>
  ({
    email: !re.email.test(value)
      ? "Email should be in the format emailusername@example.com"
      : error,
    password:
      !re.password.test(value) || !re.isEmpty.test(value)
        ? "Should only contain alphanumerics"
        : error,
    username: !re.username.test(value)
      ? "Username should have at least 3 letters"
      : error,
    confirmPassword: value !== toEqual ? "Passwords do not match" : error
  }[type]);
