import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Imageupload from "../../components/Imageupload/Imageupload";
import { saveProfileInfo } from "../../redux/actions/profileActions/profileActions";
import "./Styles/editprofile.css";

export class UnconnectedEditprofile extends Component {
  state = {
    editprofile: false,
    profiledata: this.props.profiledata
  };

  /**
   * This method toggles the editprofile prop.
   */
  toggleEditProfile = event => {
    this.setState(({ editprofile }) => ({
      editprofile: !editprofile
    }));
  };

  /**
   * edit the profile information from the input
   */
  handleEditProfileData = event => {
    const { name, value } = event.target;
    this.setState(({ profiledata }) => ({
      profiledata: {
        ...profiledata,
        [name]: value
      }
    }));
  };

  handleUpdateImage = image => {
    this.setState(({ profiledata }) => ({
      profiledata: {
        ...profiledata,
        image
      }
    }));
  };

  handleSubmitProfileData = event => {
    const { saveProfileInfo } = this.props;
    const { profiledata } = this.state;
    event.preventDefault();
    // close the modal
    this.toggleEditProfile();
    // submit the updated data
    saveProfileInfo(profiledata);
  };

  /**
   * renderUpdateForm - renders the update form
   *
   * @returns JSX (Update Profile Form)
   */

  renderUpdateForm = () => {
    const {
      profiledata: { firstname = "", lastname = "", bio = "" }
    } = this.state;
    return (
      <form
        className="form-margin"
        data-test="edit-profile-form"
        onSubmit={this.handleSubmitProfileData}
      >
        <Input
          id="firstname"
          type="text"
          name="firstname"
          label="firstname"
          onChange={this.handleEditProfileData}
          data-test="edit-firstname"
          value={firstname}
        />

        <Input
          id="lastname"
          name="lastname"
          type="text"
          label="lastname"
          data-test="edit-lastname"
          onChange={this.handleEditProfileData}
          value={lastname}
        />
        <textarea
          name="bio"
          id="bio"
          data-test="edit-bio"
          className="materialize-textarea"
          onChange={this.handleEditProfileData}
          value={bio}
        />
        <label className="active" htmlFor="bio">
          Bio
        </label>
        <Imageupload uploadedImageUrl={this.handleUpdateImage} />
        <div className="center-submit-button">
          <button
            className="orange darken-1 center-align btn waves-effect waves-light"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  };
  render() {
    const { editprofile } = this.state;
    /**
     *
     * we have the attributes of profiledata
     *  equal to an empty string incase the values are not provided
     *
     *
     * */

    return (
      <div>
        <a
          data-test="activate-edit"
          className="waves-effect orange darken-1 waves-light btn"
          onClick={this.toggleEditProfile}
        >
          <i className="material-icons left">edit</i>Edit Profile
        </a>
        <Modal
          state={editprofile ? "show" : "hide"}
          closeModal={this.toggleEditProfile}
        >
          <br />
          <h4 className="center-align">Edit your Profile</h4>
          <br />
          {this.renderUpdateForm()}
        </Modal>
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    saveProfileInfo
  }
)(UnconnectedEditprofile);
