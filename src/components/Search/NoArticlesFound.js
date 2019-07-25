import React from "react";
import Loadingfailed from "../Loadingfailed/Loadingfailed";

export default ({ handleNewSearch, title, body, action }) => (
  <div className="container">
    <Loadingfailed callback={handleNewSearch} {...{ title, body, action }} />
  </div>
);
