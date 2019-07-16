import React from "react";

import { isUserCommentOwner } from "../../redux/actions/commentsActions/commentsActions";
import CommentsAvatar from "./CommentsAvatar";
import CommentAction from "./CommentActions";

import "./Styles/commentsCards.css";

export default ({ comments, deleteComment, handleEditComment }) =>
  comments.length > 0 ? (
    comments.map((comment, i) => (
      <div key={i} className="card card-padding">
        <CommentsAvatar {...comment} />
        <p>{comment.body}</p>
        {isUserCommentOwner(comment) && (
          <CommentAction
            {...{
              comment,
              deleteComment,
              handleEditComment
            }}
          />
        )}
      </div>
    ))
  ) : (
    <div className="card card-padding" data-test="no-comments-present">
      <h6>No comment has been created, create the first one</h6>
    </div>
  );
