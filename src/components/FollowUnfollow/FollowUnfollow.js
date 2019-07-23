import React from "react";
import "./style/style.css";

const FollowUnfollow = ({ handleClick, state = {} }) => {
  const { label } = state;
  return (
    <button onClick={handleClick} className="follow_btn">
      {label}
    </button>
  );
};
export default FollowUnfollow;
