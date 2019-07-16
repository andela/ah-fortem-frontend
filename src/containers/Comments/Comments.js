import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Textarea } from "../../components/TextArea/";
import CommentsContainerList from "../../components/Comments/CommentsCards";
import LoadingCommentsCard from "../../components/Comments/CommentsLoading";
import CommentsFailedToLoad from "../../components/Comments/ComponentsFailedLoad";
import {
  createComment,
  getArticleComments,
  deleteComment,
  editComment
} from "../../redux/actions/commentsActions/commentsActions";
import { ShowMessage } from "../../redux/actions/SnackBarAction";

import "./Styles/Comments.css";
export class UnconnectedCommentsContainer extends React.Component {
  state = {
    showComments: false,
    commentBody: "",
    submitting: false,
    failedToFetchComments: false
  };

  /**
   * handles the commentsBody on change functionality
   */
  handleCommentBody = event => {
    event.persist();
    this.setState({
      commentBody: event.target.value
    });
  };

  /**
   * this method is called when comments fail to load
   */
  handleCommentsLoadingFailure = () => {
    this.setState({
      failedToFetchComments: true
    });
  };

  /**
   * this method shows and hides comments container
   */
  toggleShowComments = event => {
    this.setState({
      showComments: !this.state.showComments
    });
  };
  /**
   * toggles the showArticleComments from false to true
   * & triggers the call to getting the article's comments
   */
  showArticleComments = () => {
    const {
      getArticleComments,
      article: { slug }
    } = this.props;
    this.toggleShowComments();
    this.setState(({ showComments, failedToFetchComments }) => ({
      failedToFetchComments: false
    }));
    return getArticleComments(slug, this.handleCommentsLoadingFailure);
  };

  /**
   * this function handles the posting of comments
   */
  postComment = event => {
    event.preventDefault();
    const { commentBody } = this.state;
    this.setState({
      submitting: true
    });
    const {
      createComment,
      article: { slug }
    } = this.props;
    return createComment(slug, {
      body: commentBody
    })
      .then(this.handleSuccessfullCommentCreation)
      .catch(this.handleCommentCreationFailure);
  };

  /**
   * this method is responsible for deleting a comment
   * @param {String} - CommentId - The id of the comment
   * @returns {Promise} - Promise<Resolve | Reject>
   */
  deleteComment = commentId => {
    const {
      deleteComment,
      article: { slug }
    } = this.props;

    return deleteComment(slug, commentId)
      .then(this.handleSuccessfullCommentDeletion)
      .catch(this.handleFailDeletingComment);
  };

  /**
   * this method is called when a user deletes a comment successfully
   */

  handleSuccessfullCommentDeletion = () => {
    const { ShowMessage } = this.props;

    ShowMessage("Successfully deleted the comment");
  };

  /**
   * this method is called when a comment is not deleted successfully
   */
  handleFailDeletingComment = () => {
    const { ShowMessage } = this.props;

    ShowMessage({
      message:
        "Could not delete the comment successfully, kindly try again and make sure your internet connection is stable",
      type: "error"
    });
  };

  /**
   * this method is called when a comment is created successfully on the API
   */
  handleSuccessfullCommentCreation = event => {
    const { ShowMessage } = this.props;
    this.setState({
      commentBody: "",
      submitting: false
    });

    ShowMessage("Created the comment successfully.");
  };

  /**
   * this method is called when a comment is not created successfully
   */
  handleCommentCreationFailure = err => {
    const { ShowMessage } = this.props;
    this.setState({
      submitting: false
    });
    ShowMessage({
      message:
        "Something went wrong creating the comment, please try again and make sure the comment field is not blank",
      type: "error"
    });
  };

  /**
   * this method handles the edit a comment functionality
   */
  handleEditComment = (id, body) => {
    const {
      editComment,
      article: { slug }
    } = this.props;
    editComment(slug, id, body);
  };

  /**
   * renders the show comments button IFF a user is logged in
   * &  this.state.showComments is false
   */
  renderShowCommentsButton = () => {
    const { showComments } = this.state;
    return (
      localStorage.getItem("token") &&
      !showComments && (
        <a
          className="waves-effect show-comment waves-light chip hoverable btn-small full-width"
          data-test="show-comments"
          onClick={this.showArticleComments}
        >
          Show Comments
        </a>
      )
    );
  };

  /**
   * this method renders the hide comments Button
   */
  renderHideCommentsButton = () => {
    const {
      comments: { comments }
    } = this.props;
    const { showComments } = this.state;

    return (
      localStorage.getItem("token") &&
      showComments && (
        <a
          className="waves-effect show-comment waves-light chip hoverable btn-small full-width"
          data-test="hide-comments"
          onClick={this.toggleShowComments}
        >
          Hide Comments ({comments.length})
        </a>
      )
    );
  };

  /**
   * you must be logged in to view the article's comments
   */
  renderLoginToViewComments = () => {
    return (
      !localStorage.getItem("token") && (
        <Link
          data-test="login-to-view-comments"
          className="waves-effect show-comment waves-light chip hoverable btn-small full-width"
          to="/login"
        >
          Login to view the article's comments
        </Link>
      )
    );
  };

  /**
   * renders the new comments form IFF
   * a user is logged in &&
   * this.state.showComments is true
   */

  renderCommentsForm = () => {
    const { showComments, commentBody, submitting } = this.state;
    return localStorage.getItem("token") && showComments ? (
      <div>
        <h4>Comments</h4>
        <form
          onSubmit={this.postComment}
          data-test="new-comments-form"
          className="card comment-form"
        >
          <Textarea
            id="new-comment"
            label="Comment"
            onChange={this.handleCommentBody}
            value={commentBody}
          />
          <button
            type="submit"
            disabled={!/\S/.test(commentBody)}
            className="waves-effect waves-light orange darken-1 btn-small submit-comment"
            data-test="send-comment"
            onClick={this.postComment}
          >
            {submitting ? "Sending ..." : "Comment"}
          </button>
        </form>
      </div>
    ) : null;
  };

  /**
   * this method is responsible for rendering the fetchedComments
   */

  renderArticleCommentsCards = () => {
    const { showComments, failedToFetchComments } = this.state;
    const {
      comments: { comments, isLoading }
    } = this.props;
    return (
      showComments &&
      !isLoading &&
      !failedToFetchComments && (
        <CommentsContainerList
          {...{ comments }}
          deleteComment={this.deleteComment}
          handleEditComment={this.handleEditComment}
        />
      )
    );
  };

  /**
   * this is rendered when the comments are loading
   */

  renderLoadingCards = () => {
    const {
      comments: { isLoading }
    } = this.props;

    return isLoading && <LoadingCommentsCard />;
  };

  /***
   * this method renders the failure component when comments
   * fail to load
   */
  renderFailedToLoadComponent = () => {
    const { failedToFetchComments } = this.state;

    return (
      failedToFetchComments && (
        <CommentsFailedToLoad showArticleComments={this.showArticleComments} />
      )
    );
  };

  render() {
    return (
      <div data-test="comments-container-div">
        <div className="buttons-container">
          <div>
            {this.renderLoginToViewComments()}
            {this.renderShowCommentsButton()}
            {this.renderHideCommentsButton()}
          </div>
        </div>
        {this.renderCommentsForm()}
        {this.renderLoadingCards()}
        {this.renderArticleCommentsCards()}
        {this.renderFailedToLoadComponent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments
});

export default connect(
  mapStateToProps,
  {
    createComment,
    ShowMessage,
    getArticleComments,
    deleteComment,
    editComment
  }
)(UnconnectedCommentsContainer);
