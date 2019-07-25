import React from "react";
import Loadingfailed from "../Loadingfailed/Loadingfailed";

export default ({ showArticleComments }) => (
  <div data-test="failed-to-load-comments">
    <Loadingfailed
      callback={showArticleComments}
      title="Failed to load comments"
      body="You might be experincing an issue with your connectivity. Hit the reload
    comments button below to try and get the comments again"
      action="Reload Comments"
    />
  </div>
);
