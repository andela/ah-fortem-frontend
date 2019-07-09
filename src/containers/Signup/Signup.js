import React from "react";
import { withRouter } from "react-router-dom"

import Input from "../../components/Input/Input.js";

import { apiCalls } from "../../Helpers/axios";

export class UnconnectedSignup extends React.Component {

    state = {
        user: {
            email: "",
            password: "",
            username: "",
            confirmPassword: "",
        },
        errors: {

        }
    }

    handleChange = (event) => {
        event.persist()
        this.setState(({ user }) => ({
            user: {
                ...user,
                [event.target.name]: event.target.value
            },
            errors: {}
        }));

    }

    handleSubmit = apiCallsfn => event => {
        const {
            user
        } = this.state;

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
            return apiCallsfn("post", url, { user }).then(response => {
                const { status } = response;
                if (status === 201) {
                    this.props.history.push("/login")
                }
            }
            ).catch(error => {
                const { errors } = error.response.data;
                if (errors) {
                    this.setState({
                        errors
                    });
                }
            });


        }
    }

    render() {
        const {
            email,
            username,
            password,
            confirmPassword,
        } = this.state.user;
        // the errors object being destructured
        const { errors } = this.state;
        return (
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card hoverable">
                        <form data-test='signup-test' onSubmit={this.handleSubmit(apiCalls)}>
                            <div className="card-content">
                                <span className="card-title center-align">Signup</span>
                                <div className="row">
                                    <Input name="email" error={errors.email ? errors.email[0] : null} className={errors.email ? "invalid" : ""} data-test="email-test" value={email} label="Email" onChange={this.handleChange} type="email" />
                                    <Input name="username" error={errors.username ? errors.username[0] : null} className={errors.username ? "invalid" : ""} data-test="username-test" value={username} label="Username" onChange={this.handleChange} type="text" />
                                    <Input name="password" error={errors.password ? errors.password[0] : null} className={errors.password ? "invalid" : ""} data-test="password-test" value={password} label="Password" onChange={this.handleChange} type="password" />
                                    <Input name="confirmPassword" error={errors.confirmPassword ? errors.confirmPassword[0] : null} className={errors.confirmPassword ? "invalid" : ""} data-test="confirmPassword-test" value={confirmPassword} label="Confirm Password" onChange={this.handleChange} type="password" />
                                </div>
                            </div>

                            <div className="card-action right-align">
                                <input value="submit" type="submit" className="btn orange" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(UnconnectedSignup);
