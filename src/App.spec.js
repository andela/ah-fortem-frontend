import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { storeFactory } from "./testutils/";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = storeFactory({});
  ReactDOM.render(
    <Provider {...{ store }}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
