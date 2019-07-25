import React from "react";
import FollowUnfollow from "../../containers/FollowUnfollow/FollowUnfollowContainer";
import "./Styles/followers.css";

export default ({
  people = [],
  type = "followers",
  handleChange = () => {}
}) => {
  return people.length > 0 ? (
    people.map((user, i) => (
      <div key={i}>
        <div className="section valign-wrapper" data-test="user-section">
          <div className="col s1">
            <img
              src={
                user.image
                  ? user.image
                  : "https://cdn1.iconfinder.com/data/icons/robots-avatars-set/354/Robot_avatar___robot_robo_avatar_chatbot_chat-512.png"
              }
              alt=""
              className="circle responsive-img"
            />
          </div>
          <div className="col s11 left-align">
            <h5 className="title">{user.username}</h5>
            <FollowUnfollow
              key={"follow" + i}
              username={user.username}
              handleOnChange={handleChange}
            />
            <p>{user.bio}</p>
          </div>
        </div>

        <div className="divider"></div>
      </div>
    ))
  ) : (
    <div>
      <div className="col s12" data-test="profile-no-users">
        <h5 className="grey-text">
          {type} <span></span>
        </h5>
      </div>
    </div>
  );
};
