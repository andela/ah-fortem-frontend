import React from "react";
import SocialAuth from "../../containers/SocialAuth/SocialAuth";

export const RenderSocialAuth = () => {
  return (
    <div data-test="social-auth">
      <p className="center-align">OR</p>
      <div className="center-align">
        <SocialAuth />
      </div>
    </div>
  );
};

export default RenderSocialAuth;
