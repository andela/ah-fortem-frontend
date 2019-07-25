import React from "react";
import { withRouter } from "react-router-dom";
import "./resetPassword.css";
import { renderInput } from "../../components/Input/Input";
import { apiCalls } from "../../Helpers/axios";
import { validate } from "../../Helpers/inputValidation";

export class UnconnectedPasswordReset extends React.Component {
  state = {
    user: {
      email: ""
    },
    errors: {},
    resetbutton: {
      value: "send",
      disabled: "disabled"
    },
    status: ""
  };

  handleErrors = (name, value) => {
    const { errors } = this.state;

    const Resetpassworderror = validate(name, value);

    if (Resetpassworderror) {
      this.setState(resetbutton => ({
        errors: {
          email: [Resetpassworderror]
        },
        resetbutton: {
          ...resetbutton,
          disabled: "disabled"
        }
      }));
    } else {
      delete errors[name];

      this.setState(({ errors }) => ({
        errors: {
          ...errors
        },
        resetbutton: {
          value: "send"
        }
      }));
    }
  };

  handleChange = event => {
    event.persist();
    const { value } = event.target;

    this.setState(({ user }) => ({
      user: {
        ...user,
        email: value
      }
    }));

    this.handleErrors("email", value);
  };

  handleSubmit = apiCallsfn => event => {
    const { user, resetbutton } = this.state;
    const url = "/users/password-reset/";

    event.preventDefault();

    this.setState(state => ({
      resetbutton: {
        value: "Sending..."
      }
    }));

    return apiCallsfn("post", url, { user })
      .then(response => {
        const { status } = response.data;
        this.setState({
          status
        });
      })
      .catch(error => {
        const errors = error.response.data.error;
        this.setState({
          errors: {
            email: [errors]
          },
          resetbutton: {
            ...resetbutton,
            disabled: "disabled"
          }
        });
      });
  };

  renderForm = () => {
    const { errors, resetbutton } = this.state;

    return (
      <div
        data-test="renderform-test"
        className="row valign-wrapper vertical-center"
      >
        <div className="col s12 m4 offset-m4 valign">
          <div className="card">
            <form onSubmit={this.handleSubmit(apiCalls)}>
              <div className="card-content">
                <span className="card-title center-align">
                  Forgot your Password?
                </span>
                <p className="center-align grey-text">
                  Type in the email address your registered with
                </p>
                <br />
                <div className="row">
                  {renderInput(
                    {
                      id: "reset-email",
                      name: "email",
                      errors,
                      label: "Email",
                      type: "email"
                    },
                    this.handleChange
                  )}
                </div>
              </div>
              <div className="card-action center-align">
                <input {...resetbutton} type="submit" className="btn orange" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  renderSuccessMessage = () => {
    const {
      user: { email }
    } = this.state;
    return (
      <div className="container" data-test="rendermessage-test">
        <div className="vertical-center">
          <div className="row">
            <div className="col s6 offset-s3 center-align ">
              <div className="col s10 offset-s1">
                <div>
                  <i className="far fa-envelope fa-3x"></i>
                </div>
                <div>
                  <span>
                    <h5>Check your mail</h5>
                  </span>
                </div>
                <div className="">
                  <span className="grey-text">
                    We have received your request to reset your password and
                    sent a reset password link to {email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { status } = this.state;
    return status ? this.renderSuccessMessage() : this.renderForm();
  }
}

export default withRouter(UnconnectedPasswordReset);
