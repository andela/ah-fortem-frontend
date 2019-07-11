import Notfound from "./components/Errors/NotFound";
import Login from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";

const routes = [
  {
    path: "/login",
    key: "login",
    exact: true,
    private: false,
    name: "Login",
    component: Login
  },
  {
    /**
     * View your own profile once you are logged in
     */
    path: "/profile",
    key: "profile",
    exact: true,
    name: "Profile page",
    component: Profile
  },
  {
    /**
     * This helps a user view another user's profile
     * but not edit it.
     */
    path: "/profile/:username",
    key: "dynamic-profile",
    name: "Dynamic profile page",
    component: Profile
  },
  {
    path: "",
    key: "404",
    exact: true,
    private: false,
    name: "Page not found",
    component: Notfound
  }
];
export default routes;
