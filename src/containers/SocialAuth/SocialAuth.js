import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as firebase from "firebase/app";

import { ShowMessage } from "../../redux/actions/SnackBarAction";
import { apiCalls } from "../../Helpers/axios";
import "firebase/auth";

import "../../assets/css/sharing.css";

// setup firebase
var firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "ah-fortem.firebaseapp.com",
  projectId: "ah-fortem",
  appId: `${process.env.FIREBASE_APP_ID}`
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const SocialIcon = ({ icon, renderProps }) => (
  <li className="col s3 hoverable" {...renderProps}>
    <i className={`fab ${icon} fa-3x`} />
  </li>
);

export class SocialAuth extends Component {
  authList = () => (
    <ul className="collection social-auth">
      <FacebookLogin
        appId={`${process.env.FACEBOOK_APP_ID}`}
        autoLoad={false}
        fields="name,email,picture"
        callback={response => {
          this.handleSocialAuth("facebook", response.accessToken);
        }}
        render={renderProps => (
          <SocialIcon icon="fa-facebook" renderProps={renderProps} />
        )}
      />
      <GoogleLogin
        clientId={`${process.env.GOOGLE_CLIENT_ID}`}
        render={renderProps => (
          <SocialIcon icon="fa-google" renderProps={renderProps} />
        )}
        buttonText="Login"
        onSuccess={response => {
          this.handleSocialAuth("google-oauth2", response.accessToken);
        }}
        onFailure={ShowMessage({
          message: "Opps no data returned. Try logging in again",
          type: "error"
        })}
        cookiePolicy={"single_host_origin"}
      />

      <li
        onClick={this.handleTwitterAuth}
        data-test={"datatest"}
        className="col s3 hoverable"
      >
        <i className={`fab fa-twitter fa-3x`} />
      </li>
    </ul>
  );

  handleSocialLogin = (
    provider,
    access_token,
    access_token_secret = "token_secret"
  ) => {
    const { history, ShowMessage } = this.props;

    return apiCalls("post", "/social_auth", {
      provider,
      access_token,
      access_token_secret
    })
      .then(response => {
        const { token, email, username } = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("user", response.data.user);
        history.push("/");
        ShowMessage("Log in successful");
      })
      .catch(err => {
        ShowMessage({
          message: "Opps no data returned. Try logging in again",
          type: "error"
        });
      });
  };

  handleTwitterAuth = () => {
    const firebaseAuth = firebase.auth();
    const twitter = new firebase.auth.TwitterAuthProvider();
    return firebaseAuth.signInWithPopup(twitter).then(result => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var access_token = result.credential.accessToken;
      var access_token_secret = result.credential.secret;
      return this.handleSocialLogin(
        "twitter",
        access_token,
        access_token_secret
      );
    });
  };
  handleSocialAuth = (provider, access_token) => {
    return this.handleSocialLogin(provider, access_token);
  };

  render() {
    return <div>{this.authList()}</div>;
  }
}

export default withRouter(
  connect(
    undefined,
    {
      ShowMessage
    }
  )(SocialAuth)
);
