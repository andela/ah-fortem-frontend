import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom"
import { shallow } from "enzyme"

import App from "./App";
import Signup from "./containers/Signup/Signup"

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

let pathMap = {};

describe('Testing Routes', () => {
  beforeAll(() => {
    const component = shallow(<App />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  });

  test('should render signup Page', () => {
    expect(pathMap["/signup"]).toBe(Signup);
  })

})
