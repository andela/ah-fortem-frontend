import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import { storeFactory } from "./testutils";
const store = storeFactory();
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider {...{ store }}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
