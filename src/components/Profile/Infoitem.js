import React from "react";

import "./Styles/infoitem.css";

export default ({ propname, value, icon }) => (
  <li data-test="info-item" className="collection-item info-item avatar">
    <i className="material-icons circle">{icon}</i>
    <span className="title">{propname}</span>
    <br />
    <p>{value}</p>
  </li>
);
