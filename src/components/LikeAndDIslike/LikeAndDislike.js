import React from "react";
import { Link } from "react-router-dom";
import "./styles/likeDislike.css";
import { isLoggedIn } from "../../Helpers//authHelpers";

const LikesDislikeBtn = ({ handleClick, type, count, status }) => {
  const thumb = type === "like" ? "thumb_up" : "thumb_down";
  const { className } = status;
  return (
    <button
      className={"waves-effect waves-teal btn-flat " + className}
      data-test={type + "-btn"}
      onClick={handleClick(type)}
      name={type}
      id={type + "btn"}
    >
      <i className="material-icons Small likeIcon" name={type}>
        {thumb}
      </i>
      <span> &nbsp;{count}</span>
    </button>
  );
};

const LikeDislike = ({ handleClick, props, like, dislike }) => {
  const { likes, dislikes } = props.likesCount;

  return (
    <div className="left-align grey-text">
      {isLoggedIn() === true ? (
        <div>
          <LikesDislikeBtn
            handleClick={handleClick}
            type="like"
            count={likes}
            status={like}
          />
          <LikesDislikeBtn
            handleClick={handleClick}
            type="dislike"
            count={dislikes}
            status={dislike}
          />
        </div>
      ) : (
        <Link
          className="waves-effect white-text waves-light chip hoverable orange "
          to="/login"
          data-test="not-logged-in"
        >
          Login to view likes
        </Link>
      )}
    </div>
  );
};
export default LikeDislike;
