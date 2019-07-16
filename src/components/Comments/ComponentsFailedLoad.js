import React from "react";

export default ({ showArticleComments }) => (
  <div className="card" data-test="failed-to-load-comments">
    <div className="card-content">
      <span className="card-title">Failed to load comments</span>
      <p>
        You might be experincing an issue with your connectivity. Hit the reload
        comments button below to try and get the comments again
      </p>
    </div>
    <div className="card-action">
      <a onClick={showArticleComments}>Reload comments</a>
    </div>
  </div>
);
