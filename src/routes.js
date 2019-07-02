import React from "react";
import Notfound from "./components/Errors/NotFound";

const routes = [
  {
    path: "",
    key: "404",
    exact: true,
    private: false,
    name: "Page not found",
    render: props => <Notfound {...props} />
  }
];
export default routes;
