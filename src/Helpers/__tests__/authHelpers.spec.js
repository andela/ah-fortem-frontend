import { logout, isLoggedIn } from "../authHelpers";

test("isloggedin works as expected", () => {
  localStorage.setItem("token", "thisisatoken");
  expect(isLoggedIn()).toBe(true);
});
test("isloggedin works as expected when logged out", () => {
  localStorage.setItem("token", "thisisatoken");
  logout();
  expect(isLoggedIn()).toBe(false);
});
