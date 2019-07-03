import Notfound from "./components/Errors/NotFound";
import Login from "./containers/Login/Login";
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
    path: "",
    key: "404",
    exact: true,
    private: false,
    name: "Page not found",
    component: Notfound
  }
];
export default routes;
