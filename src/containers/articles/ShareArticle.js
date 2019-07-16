import React, { Component } from "react";
import { connect } from "react-redux";
import { apiCalls } from "../../Helpers/axios";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import "../../assets/css/sharing.css";

export class ShareBar extends Component {
  state = {
    openmodal: false,
    email: ""
  };
  handleSuccessShareResponse = ({ data }) => {
    const newLink = data.shared_link.replace(
      `${process.env.BACKEND_LINK}`,
      `${process.env.FRONTEND_LINK}`
    );
    const newWindow = window.open(newLink, "_blank");
    newWindow.focus();
  };

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handleMessages = (
    message = "Log in to share the article ...",
    type = "error"
  ) => {
    const { ShowMessage } = this.props;

    ShowMessage({
      message,
      type
    });
  };
  handleSuccessEmailShare = () => {
    this.handleMessages("Article shared successfully", "success");
  };

  handleShareSocial = (slug, platform, data = {}) => () => {
    const token = localStorage.getItem("token");
    return apiCalls("post", "/articles/" + slug + "/share/" + platform, data, {
      Authorization: `Bearer ` + token
    })
      .then(this.handleSuccessShareResponse)
      .catch(() => {
        this.handleMessages();
      });
  };
  handleShareEmail = slug => {
    const token = localStorage.getItem("token");

    return apiCalls(
      "post",
      "/articles/" + slug + "/share/email/",
      { email: this.state.email },
      {
        Authorization: `Bearer ` + token
      }
    ).then(this.handleSuccessEmailShare);
  };
  toggleModal = event => {
    if (localStorage.getItem("token")) {
      this.setState(({ openmodal }) => ({
        openmodal: !openmodal
      }));
    } else {
      this.handleMessages();
    }
  };
  handleSubmitShare = event => {
    const { article } = this.props;
    event.preventDefault();
    this.toggleModal();
    this.handleShareEmail(article.slug);
  };
  renderShareForm = () => {
    return (
      <form className="form-margin" onSubmit={this.handleSubmitShare}>
        <Input
          id="email"
          email="email"
          type="email"
          value={this.state.email}
          placeholder="Share article to this email"
          onChange={this.handleEmailChange}
        />
        <div className="center-submit-button">
          <input
            type="submit"
            className="orange darken-1 center-align btn waves-effect waves-light"
            value="Share"
          />
        </div>
      </form>
    );
  };
  collection = () => {
    const { article } = this.props;
    return (
      <ul className="collection">
        {[
          {
            action: this.handleShareSocial(article.slug, "facebook/"),
            icon: "fab fa-facebook",
            datatest: "facebook-social"
          },
          {
            action: this.handleShareSocial(article.slug, "twitter/"),
            icon: "fab fa-twitter",
            datatest: "twitter-social"
          },
          {
            action: this.toggleModal,
            icon: "fas fa-envelope",
            datatest: "mail"
          }
        ].map(({ icon, action, datatest }) => (
          <li
            key={icon}
            data-test={datatest}
            className="collection-item"
            onClick={action}
          >
            <i className={`${icon} fa-2x`} />
          </li>
        ))}
      </ul>
    );
  };
  render() {
    const { openmodal } = this.state;
    return (
      <div data-test="share-bar">
        <div className="left-sidebar">
          {this.collection()}
          <Modal
            state={openmodal ? "show" : "hide"}
            closeModal={this.toggleModal}
          >
            {this.renderShareForm()}
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    ShowMessage
  }
)(ShareBar);
