import React from "react";

import "./Styles/profiledata.css";
import userimage from "../../assets/images/user.png";
import InfoItem from "./Infoitem";

/**
 *
 * renderEditComponent - function - renders a function as a child
 */
export default ({
  data: { image, username, firstname, lastname, bio },
  renderEditComponent
}) => (
  <div className="row profile-data-wrapper">
    {/* image avatar */}
    <div className="col s12 m5 l2" data-test="profile-data-component">
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="profile-avatar">
              <img
                className="profile-avatar"
                data-test="profile-image"
                src={image ? image : userimage}
                alt={username}
              />
            </div>
          </div>
          <div className="col s12">
            <h4 className="profile-username">{username}</h4>
          </div>
        </div>
      </div>
    </div>
    {/** user information */}
    <div className="col s12 m5 l8">
      <div className="container">
        <ul className="collection">
          <InfoItem propname={"Firstname"} value={firstname} icon={"info"} />
          <InfoItem propname={"Lastname"} value={lastname} icon={"info"} />
          <InfoItem propname={"Bio"} value={bio} icon={"library_books"} />
        </ul>
      </div>
    </div>
    {/** edit button to be seen only by profile owner */}
    <div className="col s12 m2 l2">
      <div>{renderEditComponent({ image, firstname, lastname, bio })}</div>
    </div>
  </div>
);
