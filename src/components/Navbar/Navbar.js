import React from "react";
import { Link } from "react-router-dom";
import Navlinks from "../../utils/links";

const { auth, anonymous, alwaySeen } = Navlinks;
const LinksList = ({ links }) =>
  links.map(navlink => (
    <li key={navlink.name}>
      <Link to={navlink.link}>{navlink.name}</Link>
    </li>
  ));
const AuthLinks = ({ isLoggedin }) => {
  return isLoggedin === true ? (
    <LinksList links={auth} />
  ) : (
    <LinksList links={anonymous} />
  );
};
const Navbar = ({ isLoggedin }) => {
  return (
    <div className="navbar-fixed">
      <nav className="orange darken-1">
        <div className="nav-wrapper">
          <div className="container">
            <a href="/" className="brand-logo">
              Authors Haven
            </a>
            <a
              href="#"
              data-target="mobile-sidemenu"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down" data-test="links-list">
              <LinksList links={alwaySeen} />
              <AuthLinks isLoggedin={isLoggedin} />
            </ul>
          </div>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-sidemenu">
        <LinksList links={alwaySeen} />
        <AuthLinks isLoggedin={isLoggedin} />
      </ul>
    </div>
  );
};
export default Navbar;
