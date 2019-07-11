import React from "react";

export default ({ propname, value, icon }) => (
  <li data-test="info-item" className="collection-item avatar">
    <i className="material-icons circle">{icon}</i>
    <span className="title">{propname}</span>
    <br />
    {value}
  </li>
);
