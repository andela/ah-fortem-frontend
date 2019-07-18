import React from "react";
import { Spring } from "react-spring/renderprops.cjs.js";

import Modal from "../../components/Modal/Modal";
import TextField from "../../components/TextArea/Textarea";

import "./Styles/CardActions.css";

export default class Cardactions extends React.Component {
  state = {
    deletePrompt: false,
    editComment: false,
    commentBody: this.props.comment.body
  };

  /**
   * this method is a reuseable method that can be used to
   * toggle state of a specific property from
   * true | false
   */
  handleDynamicStateToggle = prop => {
    this.setState({
      [prop]: !this.state[prop]
    });
  };

  /**
   * this method toggles the deletePrompt of the cards component
   */
  toggleDeletePrompt = () => {
    this.handleDynamicStateToggle("deletePrompt");
  };

  /***
   * this method is called when a user confirms
   * that they want to delete
   * a comment
   */
  deleteSingleComment = event => {
    const { deleteComment, comment } = this.props;
    this.toggleDeletePrompt();
    deleteComment(comment.id);
  };

  /**
   * this method renders the delete confirmation
   */
  renderDeletePrompt = () => {
    const { deletePrompt } = this.state;
    return (
      <Spring
        from={{ opacity: 0, height: 0 }}
        to={{
          opacity: deletePrompt ? 1 : 0,
          height: deletePrompt ? 100 : 0
        }}
      >
        {style => (
          <div
            data-test="delete-prompt-container"
            style={{ ...style, display: style.height <= 30 && "none" }}
          >
            <h6 className="center-align">
              Are you sure you want to delete this comment?
            </h6>
            <div className="card-action-buttons">
              <div>
                <button
                  onClick={this.toggleDeletePrompt}
                  className="delete-buttons btn waves-effect waves-light grey darken-1"
                >
                  Cancel
                </button>
                <button
                  onClick={this.deleteSingleComment}
                  className="delete-buttons btn waves-effect waves-light red darken-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  };

  /**
   * this method toggles the editComment property
   */

  handleToggleEditComment = () => {
    this.handleDynamicStateToggle("editComment");
  };

  /**
   * this method handles the change in the commentBody
   */
  handleChangeCommentBody = event => {
    this.setState({
      commentBody: event.target.value
    });
  };

  /**
   * handles closing the Modal and sending data to the
   * api
   */
  handleFormCommentSubmission = event => {
    event.preventDefault();
    const { commentBody } = this.state;

    const {
      handleEditComment,
      comment: { id }
    } = this.props;
    this.handleToggleEditComment();
    handleEditComment(id, commentBody);
  };

  /**
   * this method renders the modal responsible for editing a comment
   */
  renderEditModal = () => {
    const { editComment, commentBody } = this.state;

    return (
      <Modal
        state={editComment ? "show" : "hide"}
        closeModal={this.handleToggleEditComment}
      >
        <div>
          <h6 className="center-align inform">
            Once you are done updating your comment, hit submit
          </h6>
          <form onSubmit={this.handleFormCommentSubmission}>
            <TextField
              autoFocus
              value={commentBody}
              onChange={this.handleChangeCommentBody}
              label="Edit comment"
            />
            <div className="card-action-buttons">
              <button
                className="btn waves-effect waves-light orange darken-1"
                type="submit"
                disabled={!/\S/.test(commentBody)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  };
  render() {
    return (
      <div data-test="card-action-container">
        <div className="card-action-flex-container">
          <div>
            <i
              className="material-icons waves-effect small"
              onClick={this.handleToggleEditComment}
            >
              edit
            </i>
            <i
              className="material-icons waves-effect small delete"
              onClick={this.toggleDeletePrompt}
            >
              delete_outline
            </i>
          </div>
        </div>
        {this.renderDeletePrompt()}
        {this.renderEditModal()}
      </div>
    );
  }
}
