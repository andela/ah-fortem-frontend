import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Editprofile from "./Editprofile";

import { Profiledata, Loadingprofile } from "../../components/Profile";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import { getProfile } from "../../redux/actions/profileActions/profileActions";
import { isLoggedIn } from "../../Helpers/authHelpers";

export class UnconnectedProfile extends React.Component {
  /***
   * @params - unit - takes no parameters
   * checks if the user is logged in then goes ahead
   * to grab their username and fetch their profiles with it
   */
  getCurrentlyLoggedInUserProfile = () => {
    const { history, getProfile, ShowMessage } = this.props;
    if (isLoggedIn()) {
      getProfile(localStorage.getItem("username"), history);
    } else {
      /**
       * if the user is not logged in redirect them to the login page
       * and show them an error message
       *  */
      history.push("/login");
      ShowMessage({
        message: "Kindly login to view your profile",
        type: "error"
      });
    }
  };
  componentDidMount() {
    const {
      getProfile,
      match: {
        params: { username }
      },
      history
    } = this.props;
    // fetch the data from the endpoint & pass it to redux
    return username
      ? getProfile(username, history)
      : this.getCurrentlyLoggedInUserProfile();
  }
  render() {
    const {
      profile: { data, isLoading, isOwner }
    } = this.props;
    return (
      <div>
        {isLoading && (
          <div data-test="profile-loading">
            <Loadingprofile />
          </div>
        )}

        {data && (
          <div className="container" data-test="profile-data">
            <Profiledata
              {...{ data }}
              renderEditComponent={profiledata =>
                isOwner ? <Editprofile {...{ profiledata }} /> : null
              }
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getProfile,
      ShowMessage
    }
  )(UnconnectedProfile)
);
