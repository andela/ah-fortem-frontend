import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Textarea } from "../../components/TextArea/";
import CommentsContainerList from "../../components/Comments/CommentsCards";
import LoadingCommentsCard from "../../components/Comments/CommentsLoading";
import {
  createComment,
  getArticleComments
} from "../../redux/actions/commentsActions/commentsActions";
import { ShowMessage } from "../../redux/actions/SnackBarAction";

import "./Styles/Comments.css";
export class UnconnectedCommentsContainer extends React.Component {
  state = {
    showComments: false,
    commentBody: "",
    submitting: false
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
   * toggles the showArticleComments from false to true
   * & triggers the call to getting the article's comments
   */
  showArticleComments = () => {
    const {
      getArticleComments,
      article: { slug }
    } = this.props;
    this.setState(({ showComments }) => ({
      showComments: true
    }));
    getArticleComments(slug);
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
   * renders the show comments button IFF a user is logged in
   * &  this.state.showComments is false
   */
  renderShowCommentsButton = () => {
    const { showComments } = this.state;
    return localStorage.getItem("token") && !showComments ? (
      <a
        className="waves-effect waves-light orange darken-1 btn-small full-width"
        data-test="show-comments"
        onClick={this.showArticleComments}
      >
        Show Comments
      </a>
    ) : null;
  };

  /**
   * you must be logged in to view the article's comments
   */
  renderLoginToViewComments = () => {
    return (
      !localStorage.getItem("token") && (
        <Link
          data-test="login-to-view-comments"
          className="waves-effect waves-light orange darken-1 btn full-width"
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
    const { showComments } = this.state;
    const {
      comments: { comments }
    } = this.props;
    return showComments && <CommentsContainerList {...{ comments }} />;
  };

  renderLoadingCards = () => {
    const {
      comments: { isLoading }
    } = this.props;

    return isLoading && <LoadingCommentsCard />;
  };

  render() {
    return (
      <div data-test="comments-container-div">
        {this.renderLoginToViewComments()}
        {this.renderShowCommentsButton()}
        {this.renderCommentsForm()}
        {this.renderLoadingCards()}
        {this.renderArticleCommentsCards()}
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
    getArticleComments
  }
)(UnconnectedCommentsContainer);
