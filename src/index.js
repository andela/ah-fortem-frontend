import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";

import { registerSW } from "./sw";

registerSW();
ReactDOM.render(
  <Provider {...{ store }}>
    <App />
  </Provider>,
  document.getElementById("app")
);
