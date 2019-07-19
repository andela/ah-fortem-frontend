import React from "react";
import { withRouter } from "react-router-dom";
import queryString from 'query-string';

import { renderInput } from "../../components/Input/Input";
import { connect } from "react-redux"
import { apiCalls } from "../../Helpers/axios"
import { validate } from "../../Helpers/inputValidation";
import { ShowMessage } from "../../redux/actions/SnackBarAction"


export class UnconnectedResetPassWordConfirm extends React.Component {

    state = {
        user: {
            password: "",
            confirmPassword: ""
        },
        btn: {
            value: "reset password",
            disabled: "disabled",
        },
        errors: {

        }
    }

    handleErrors = (name, value) => {
        const {
            errors,
            btn,
            user
        } = this.state

        const error = Object.assign({}, {
            password: validate("password", value) ? [validate("password", value)] : null,
            confirmPassword: validate("confirmPassword", value, user.password) ? [validate("confirmPassword", value, user.password)] : null,
        })
        if (!Object.values(error).every((val) => !val)) {
            this.setState(() => ({
                errors: {
                    ...errors,
                    [name]: error[name]
                },
                btn: {
                    ...btn, disabled: "disabled"
                }
            }))
        } else {
            delete errors[name];

            this.setState(() => ({
                errors: {
                    ...errors
                },
                btn: {
                    value: "reset password"
                }
            }))
        }
    };

    handleChange = (event) => {
        event.persist();
        const { value, name } = event.target;

        this.setState(({ user }) => ({
            user: {
                ...user,
                [name]: value
            }
        }))

        this.handleErrors(name, value)
    }

    handleSubmit = apiCallsfn => event => {
        event.preventDefault()

        const {
            user: {
                password,
                confirmPassword
            }
        } = this.state
        const { ShowMessage } = this.props

        const params = queryString.parse(this.props.location.search)
        const token = params.token
        const uid = params.uid
        const url = `/users/password-reset-confirm/?uid=${uid}&&token=${token}`

        this.setState(() => ({
            btn: {
                value: "resetting..."
            }
        }))
        return apiCallsfn("patch", url, { new_password: password, re_new_password: confirmPassword }).then(response => {
            this.props.history.push("/login");
            ShowMessage("Password reset was successful plase login");
        })
    }

    renderForm = (btn) => {
        const { errors } = this.state

        return (
            <div className="row valign-wrapper vertical-center" data-test="confirmpasswordreset-test">
                <div className="col s12 m4 offset-m4 valign">
                    <div className="card">
                        <form onSubmit={this.handleSubmit(apiCalls)}>
                            <div className="card-content">
                                <span className="card-title center-align">Reset Your Password</span>
                                <p className="center-align grey-text">Enter your new password below</p>
                                <div className="row">
                                    {renderInput({ id: "new-password", name: "password", errors, label: "Password", type: "password" }, this.handleChange)}
                                    {renderInput({ id: "re-new-password", name: "confirmPassword", errors, label: "Confirm Password", type: "password" }, this.handleChange)}
                                </div>
                            </div>
                            <br />
                            <div className="card-action center-align">
                                <input {...btn} type="submit" className="btn orange" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return this.renderForm(this.state.btn)
    }
}

export default withRouter(
    connect(
        undefined,
        {
            ShowMessage
        })(UnconnectedResetPassWordConfirm)
)