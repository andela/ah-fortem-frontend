import React from "react";
import Notfound from "./components/Errors/NotFound";
import Signup from "./containers/Signup/Signup";
const routes = [
  {
    path: "/signup",
    key: "200",
    exact: true,
    private: false,
    name: "Signup page",
    component: Signup
  },
  {
    path: "",
    key: "404",
    exact: true,
    private: false,
    name: "Page not found",
    component: Notfound
  },

];
export default routes;
