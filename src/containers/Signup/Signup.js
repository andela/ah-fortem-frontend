import React from "react";
import { withRouter } from "react-router-dom"

import { renderInput } from "../../components/Input/Input";
import { connect } from "react-redux";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import { apiCalls } from "../../Helpers/axios";
import { validate } from "../../Helpers/inputValidation";

export class UnconnectedSignup extends React.Component {

    state = {
        user: {
            email: "",
            password: "",
            username: "",
            confirmPassword: "",
        },
        errors: {
            email: "",
            password: "",
            username: "",
            confirmPassword: "",
        },
        signup: {
            value: "Submit",
            disabled: "disabled"
        }
    }

    handleErrors = (name, value, user) => {
        const {
            errors
        } = this.state;

        const error = validate(name, value, user.password);
        
        if (error) {
            this.setState(({ errors, signup }) => ({
                errors: {
                    ...errors,
                    [name]: [error]
                },
                signup: {
                    ...signup, disabled: "disabled"
                }

            }));
        } else {
            delete errors[name];

            this.setState(({ errors }) => ({
                errors: {
                    ...errors
                }
            }));

        }
        if (Object.keys(errors).length === 0) {
            this.setState({
                signup: {
                    value: "submit"
                }
            });
        }
    }

    handleChange = (event) => {
        const {
            user
        } = this.state;
        event.persist()
        const { value, name } = event.target;

        this.setState(({ user }) => ({
            user: {
                ...user,
                [event.target.name]: event.target.value
            }
        }));

        this.handleErrors(name, value, user);
    }
    
    handleSubmit = apiCallsfn => event => {
        const {
            user,
            signup
        } = this.state;
        const { ShowMessage } = this.props
        event.preventDefault();
        const url = "/users/"
        if (user.password !== user.confirmPassword) {
            this.setState(state => ({
                errors: {
                    confirmPassword: ["Passwords don't match"]
                }
            }))

            return;
        } else {
            this.setState(state => ({
                signup: {
                    value: "Submitting..."
                }
            }));
            return apiCallsfn("post", url, { user }).then(response => {
                this.props.history.push("/login");
                ShowMessage("Signup successful please check your email to activate your account");
            }
            ).catch(error => {
                this.setState(state => ({
                    signup: {
                        value: "Submit"
                    }
                }));
                const { errors } = error.response.data;
                const { status } = error.response;
                if (status === 400) {
                    this.setState({
                        errors,
                        signup: {
                            ...signup,
                            disabled: "disabled"
                        }
                    });
                }
                else {
                    ShowMessage({
                        message: "Api Server error 500 occured. Please try again",
                        type: "error"
                    });
                }
            });


        }
    }

    renderForm = () => {
        const { errors, signup, user: {
            email,
            username,
            password,
            confirmPassword,
        } } = this.state;

        const inputFields = {
            email: {id: "email", name: "email", errors, value: email, label: "Email", type: "email"},
            username: { id: "username", name: "username", errors, value: username, label: "Username", type: "text" },
            password: { id: "password", name: "password", errors, value: password, label: "Password", type: "password" },
            confirmPassword: { id: "confirmPassword", name: "confirmPassword", errors, value: confirmPassword, label: "Confirm Password", type: "password" }
        }
        return (
            <form data-test='signup-test' onSubmit={this.handleSubmit(apiCalls)}>
                <div className="card-content">
                    <span className="card-title center-align">Signup</span>
                    <div className="row">
                        {renderInput(inputFields.email, this.handleChange)}
                        {renderInput(inputFields.username, this.handleChange)}
                        {renderInput(inputFields.password, this.handleChange)}
                        {renderInput(inputFields.confirmPassword, this.handleChange)}
                    </div>
                </div>
                <div className="card-action right-align">
                    <input {...signup} type="submit" className="btn orange" />
                </div>
            </form>
        )
    }
  
    render() {
        return (
            <div className="row">
                <div className="col s12 m4 offset-m4">
                    <div className="card hoverable">
                        {this.renderForm()}
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(
    connect(
        undefined,
        {
            ShowMessage
        })(UnconnectedSignup));