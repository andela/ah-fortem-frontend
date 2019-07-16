import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../containers/Ratings/RatingArticle";
import LikeDislike from "../../containers/LikesDislike/LikesDislikesContainer";

const renderRateLogin = () => {
  return (
    <p className="right-align">
      <Link
        data-test="login-to-view-comments"
        className="waves-effect white-text waves-light chip hoverable orange "
        to="/login"
      >
        Login to rate this article
      </Link>
    </p>
  );
};

const Feedback = props => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="row">
          <div className="col s6">
            <LikeDislike />
          </div>
          <div className="col s6">
            {localStorage.getItem("token") ? (
              <Rating {...props} />
            ) : (
              renderRateLogin()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
