import React from "react";
import "./Styles/LoadingCard.css";
import "../../assets/css/loading.css";

export default props =>
  [1, 2, 3, 4, 5].map(n => (
    <div
      data-test="loading-comments"
      key={n}
      className="card animated-background loading-card"
    >
      <br />
    </div>
  ));
