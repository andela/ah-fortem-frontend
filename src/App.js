import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./assets/css/app.scss";

import SnackbarHoc from "./containers/Snackbars/Snackbar";
import { isLoggedIn } from "./Helpers/authHelpers";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar isLoggedin={isLoggedIn()} />
        <div className="page-body">
          <Switch>
            {routes.map(route => (
              <Route {...route} />
            ))}
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

// setsup hot reloading
export default SnackbarHoc(App);
