import React, { Component } from "react";
import FollowUnfollowBtn from "../../components/FollowUnfollow/FollowUnfollow";
import { apiCalls } from "../../Helpers/axios";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import appStore from "../../redux/store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json"
};
export class FollowUnfollow extends Component {
  state = {
    label: "follow"
  };

  componentDidMount() {
    this._isMounted = true;
    return this.getUserFollowing();
  }
  getUserFollowing = () => {
    const { username } = this.props;
    const url = `/profiles/${username}/`;
    return (
      this._isMounted &&
      apiCalls("get", url, { headers }).then(response => {
        const {
          profile: { following }
        } = response.data;
        if (following === true) {
          this.setState({ label: "unfollow" });
        }
      })
    );
  };

  handleClick = () => {
    const { username } = this.props;
    const { dispatch } = appStore;
    const { label } = this.state;
    const url = `/users/${username}/follow/`;

    if (label === "follow") {
      return apiCalls("post", url, {}, headers)
        .then(response => {
          this.setState({ label: "unfollow" });
        })
        .catch(error => {
          dispatch(
            ShowMessage({
              message:
                "Error following user, check your internet connection and try again",
              type: "error"
            })
          );
        });
    } else {
      return apiCalls("delete", url, { headers })
        .then(response => {
          if (!this.props.handleOnChange(username)) {
            this.setState({ label: "follow" });
          }
        })
        .catch(error => {
          dispatch(
            ShowMessage({
              message:
                "Error unfollowing user, check your connection and try again",
              type: "error"
            })
          );
        });
    }
  };
  render() {
    return (
      <FollowUnfollowBtn handleClick={this.handleClick} state={this.state} />
    );
  }
}

export default FollowUnfollow;
