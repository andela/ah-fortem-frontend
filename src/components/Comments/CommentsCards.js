import React from "react";

import CommentsAvatar from "./CommentsAvatar";

import "./Styles/commentsCards.css";

export default ({ comments }) =>
  comments.length > 0 ? (
    comments.map((comment, i) => (
      <div key={i} className="card card-padding">
        <CommentsAvatar {...comment} />
        <p>{comment.body}</p>
      </div>
    ))
  ) : (
    <div className="card card-padding" data-test="no-comments-present">
      <h6>No comment has been created, create the first one</h6>
    </div>
  );
