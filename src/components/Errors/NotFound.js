import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Error</span>
          <hr className="text-grey text-lighten-1" />
          <h3 data-test="error-404">Page Not Found</h3>
        </div>
        <div className="card-action">
          <a href="/">Home</a>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
