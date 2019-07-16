import Notfound from "./components/Errors/NotFound";
import Login from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";
import Signup from "./containers/Signup/Signup";
import Articles from "./containers/articles/Articles";
import ViewArticle from "./containers/articles/ViewArticle";
import PostArticle from "./containers/articles/PostArticle";
import EditArticle from "./containers/articles/EditArticle";
import PasswordReset from "./containers/PasswordReset/Passwordreset";
import ResetPasswordConfirm from "./containers/PasswordReset/ConfirmPasswordReset";
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
    path: "/signup",
    key: "200",
    exact: true,
    private: false,
    name: "Signup page",
    component: Signup
  },
  {
    path: "/",
    key: "Home",
    exact: true,
    private: false,
    name: "Articles",
    component: Articles
  },
  {
    path: "/articles/:slug",
    key: "Article",
    exact: true,
    private: false,
    name: "Article",
    component: ViewArticle
  },
  {
    path: "/articles",
    key: "Post Article",
    exact: true,
    private: false,
    name: "PostArticle",
    component: PostArticle
  },
  {
    path: "/edit/:slug",
    key: "Edit Article",
    exact: true,
    private: false,
    name: "EditArticle",
    component: EditArticle
  },
  {
    path: "/reset-password/",
    key: "Reset Password",
    exact: true,
    private: false,
    name: "PasswordReset",
    component: PasswordReset
  },
  {
    path: "/password-reset-confirm",
    key: "Reset Password Confirm",
    exact: true,
    private: false,
    name: "PasswordRestConfirm",
    component: ResetPasswordConfirm
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
