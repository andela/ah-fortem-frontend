import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNotifications } from "../../redux/actions/notificationActions";
import "../../assets/css/notifcations.css";

export class Notifications extends Component {
  componentDidMount() {
    const username = localStorage.getItem("username");
    const url =
      "ws://ah-premier-staging.herokuapp.com/api/notifications/" +
      username +
      "/";

    this.props.fetchNotifications(url);
  }

  notificationList = notifications => {
    return notifications.map((notification, i) => {
      return (
        <li data-test="notifications" key={i}>
          <a href="#!">{notification.message}</a>
        </li>
      );
    });
  };

  render() {
    const notifications = this.props.notifications;
    const count = notifications.length;
    return (
      <li>
        <a
          className="dropdown-trigger"
          href="#!"
          data-test="notification-count"
          data-target="dropdown1"
        >
          <i className="material-icons small-text">notifications_active </i>
          {count > 0 ? <span className="badge">{count}</span> : ""}
        </a>
        <ul
          id="dropdown1"
          className="dropdown-content"
          data-test="notification-list"
        >
          {this.notificationList(notifications)}
        </ul>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

export default connect(
  mapStateToProps,
  { fetchNotifications }
)(Notifications);
