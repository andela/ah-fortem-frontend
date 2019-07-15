import React from "react";

import { dateFormatter } from "../../Helpers/date";
import userImage from "../../assets/images/user.png";

import "./Styles/commentsAvatar.css";
export default ({ user: { image, username }, created_at }) => (
  <div
    className="comment-avatar-container"
    data-test="comments-avatar-container"
  >
    <div className="avatar-image">
      <img
        src={image ? image : userImage}
        alt={username}
        data-test="comment-avatar"
      />
    </div>
    <div className="comment-header-details">
      <div>{username}</div>
      <div>{dateFormatter(created_at)}</div>
    </div>
  </div>
);
