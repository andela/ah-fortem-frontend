import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Editprofile from "./Editprofile";

import { Profiledata, Loadingprofile } from "../../components/Profile";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import { getProfile } from "../../redux/actions/profileActions/profileActions";
import { isLoggedIn } from "../../Helpers/authHelpers";
import ProfileTabs from "../../components/ProfileTabs/ProfileTabs";
import { optIn, optOut } from "../../redux/actions/notificationActions";

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
export class UnconnectedProfile extends React.Component {
  constructor(props) {
    super();
    this.state = { in_app: true, in_email: true };
    this.handleAppNotifications = this.handleAppNotifications.bind(this);
    this.handleEmailNotifications = this.handleEmailNotifications.bind(this);
  }

  /***
   * @params - unit - takes no parameters
   * checks if the user is logged in then goes ahead
   * to grab their username and fetch their profiles with it
   */
  getCurrentlyLoggedInUserProfile = () => {
    const { history, getProfile, ShowMessage } = this.props;
    if (isLoggedIn()) {
      return getProfile(username, history).then(profile => {
        const { email_notifications, in_app_notifications } = profile;
        this.setState({
          in_app: in_app_notifications,
          in_email: email_notifications
        });
      });
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
  handleOpts = (checked, type) => {
    if (checked) {
      this.props.optIn(token, type);
    } else {
      this.props.optOut(token, type);
    }
  };
  handleAppNotifications = in_app => {
    this.handleOpts(in_app, "in_app");
    this.setState({ in_app: in_app });
  };
  handleEmailNotifications = in_email => {
    this.handleOpts(in_email, "email");
    this.setState({ in_email: in_email });
  };
  renderProfileData = (data, isOwner) => {
    return (
      <div>
        {data && (
          <div className="container" data-test="profile-data">
            <Profiledata
              {...{ data }}
              renderEditComponent={profiledata =>
                isOwner ? <Editprofile {...{ profiledata }} /> : null
              }
              handleAppNotifications={this.handleAppNotifications}
              handleEmailNotifications={this.handleEmailNotifications}
              app_checked={this.state.in_app}
              email_checked={this.state.in_email}
              owner={isOwner}
            />
            <div>
              <ProfileTabs username={data.username} />
            </div>
          </div>
        )}
      </div>
    );
  };
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
        {this.renderProfileData(data, isOwner)}
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
      ShowMessage,
      optIn,
      optOut
    }
  )(UnconnectedProfile)
);
