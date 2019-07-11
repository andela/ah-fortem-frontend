import React from "react";
import "../../assets/css/loading.css";
import "./Styles/loadingprofile.css";

export default () => (
  <div>
    <div className="row profile-loading-container">
      <div className="col s12 m5 l2">
        <div className="container">
          <div className="row">
            <div className="col s12 m5 l2">
              <div className="animated-background avatar-loading">
                <p />
              </div>
            </div>
            <div className="col s12 m5 l8">
              <div className="animated-background user-details collection">
                <p />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="animated-background edit-button" />
      </div>
    </div>
  </div>
);
