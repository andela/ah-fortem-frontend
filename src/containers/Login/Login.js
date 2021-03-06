import React, { Component } from "react";

import Input from "../../components/Input/Input";
import "./styles/LoginStyle.css";
import { connect } from "react-redux";
import { apiCalls } from "../../Helpers/axios";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import { isLoggedIn } from "../../Helpers/authHelpers";
import { validate } from "../../Helpers/inputValidation";
import RenderSocialAuth from "../../components/SocialAuth/SocialAuth";

export class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      errors: {},
      login: { value: "Login", disabled: "disabled" }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (isLoggedIn()) {
      const { history, ShowMessage } = this.props;
      ShowMessage("Hello, you are already Logged in.");
      history.push("/");
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { history, ShowMessage } = this.props;
    ShowMessage("Logging in....");
    this.setState({
      ...this.state,
      login: { ...this.state.login, value: "Submitting ....." }
    });
    return apiCalls("post", "/users/login", this.state)
      .then(response => {
        if (response.data != null) {
          const { token, email, username } = response.data.user;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("username", username);
          localStorage.setItem("user", response.data.user);
          history.push("/");
          ShowMessage("Log in successful");
          return;
        } else {
          ShowMessage({
            message: "Opps no data returned. Try logging in again",
            type: "error"
          });
        }
        return;
      })
      .catch(err => {
        const { status } = err.response;
        this.setState({
          ...this.state,
          login: { ...this.state.login, value: "Login" }
        });
        if (status === 500) {
          ShowMessage({
            message: "Api Server error 500. Try logging in again",
            type: "error"
          });
        }
        if (status === 400) {
          const { errors } = err.response.data;
          this.setState({ errors });
          const { error } = this.state.errors;
          ShowMessage({ message: error[0], type: "error" });
        }
      });
  }

  handleChange(event) {
    const { user, login } = this.state;
    if (
      (validate("email", user.email) === false) &
      (user.password.length > 4)
    ) {
      this.setState({
        ...this.state,
        login: { ...login, disabled: "" }
      });
    } else {
      this.setState({
        ...this.state,
        login: { ...login, disabled: "disabled" }
      });
    }

    this.setState({
      user: { ...user, [event.target.name]: event.target.value },
      errors: {}
    });
  }

  render() {
    const { email, password } = this.state.user;
    const { errors, login } = this.state;
    return (
      <div className="row valign-wrapper login-box">
        <div className="col s12 m4 offset-m4 valign">
          <div className="card hoverable">
            <div className="card-content">
              <form onSubmit={this.handleSubmit} data-test="comp-login">
                <div>
                  <span className="card-title center-align">Login</span>

                  <div className="row">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      id="email"
                      error={errors.email ? errors.email[0] : null}
                      className={errors.email ? "invalid" : ""}
                      required="required"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      id="password"
                      required="required"
                      error={errors.password ? errors.password[0] : null}
                      className={errors.password ? "invalid" : ""}
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <input type="submit" className="btn orange" {...login} />
                </div>
              </form>
              <RenderSocialAuth />
            </div>

            <div className="card-action right-align">
              <a className="blue-text" href="/reset-password">
                Reset Password
              </a>
            </div>
          </div>
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
)(UnconnectedLogin);
