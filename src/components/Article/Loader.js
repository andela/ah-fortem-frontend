import React from "react";
export const Loader = () => (
  <div className="preloader-wrapper big active loader">
    <div className="spinner-layer spinner-orange">
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  </div>
);

export default Loader;
