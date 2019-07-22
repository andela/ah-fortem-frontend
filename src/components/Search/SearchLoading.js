import React from "react";

import "../../assets/css/loading.css";
import "./Styles/Loadingarticles.css";

export default () => (
  <div className="row">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} data-test="loading-article" className="col s12 m4">
        <div className="animated-background loading-article" />
      </div>
    ))}
  </div>
);
