import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./assets/css/app.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
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
export default App;
