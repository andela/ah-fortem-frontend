import React from "react";
import { Link } from "react-router-dom";
import Navlinks from "../../utils/links";
import "./NavbarStyle.css";
import { logout, isLoggedIn } from "../../Helpers/authHelpers";
import { withRouter } from "react-router-dom";
import Notifications from "../../containers/Notifications/notifications";

const { auth, anonymous, alwaySeen } = Navlinks;
const LinksList = ({ links }) =>
  links.map(navlink => (
    <li key={navlink.name}>
      <Link to={navlink.link} {...navlink}>
        {navlink.name}
      </Link>
    </li>
  ));
const AuthLinks = ({ history, isLoggedin }) => {
  return isLoggedin === true ? (
    <LinksList links={auth} />
  ) : (
    <LinksList links={anonymous} />
  );
};
export const LogoutLink = ({ isLoggedin, history }) => {
  return isLoggedin ? (
    <li>
      <a
        data-test="logout-link"
        onClick={() => {
          logout();
          history.push("/login");
        }}
      >
        Logout
      </a>
    </li>
  ) : (
    ""
  );
};
const Navbar = ({ history, isLoggedin = isLoggedIn() }) => {
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
              {isLoggedin ? <Notifications /> : ""}
              {isLoggedin && <li><a href="/articles">New Article</a></li>}
              <AuthLinks isLoggedin={isLoggedin} />
              <LogoutLink isLoggedin={isLoggedin} history={history} />
            </ul>
          </div>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-sidemenu">
        <LinksList links={alwaySeen} />
        <AuthLinks isLoggedin={isLoggedin} />
        <LogoutLink isLoggedin={isLoggedin} history={history} />
      </ul>
    </div>
  );
};
export default withRouter(Navbar);
