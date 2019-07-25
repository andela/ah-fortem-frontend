import React from "react";

export default ({ callback, title, body, action }) => (
  <div className="card">
    <div className="card-content">
      <span className="card-title">{title}</span>
      <p>{body}</p>
    </div>
    <div className="card-action">
      <a onClick={callback}>{action}</a>
    </div>
  </div>
);
