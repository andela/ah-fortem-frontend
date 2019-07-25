import React from "react";

import "./Styles/infoitem.css";

export default ({ propname, value, icon, image }) => (
  <li data-test="info-item" className="collection-item info-item avatar">
    {image ? (
      <img src={image} alt={propname} className="circle" />
    ) : (
      <i className="material-icons circle">{icon}</i>
    )}
    <span className="title">{propname}</span>
    <br />
    <p>{value}</p>
  </li>
);
