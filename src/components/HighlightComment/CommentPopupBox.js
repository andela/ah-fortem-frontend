import React from "react";
import "./styles/commentPopupBox.css";
import { connect } from "react-redux";
import { createComment } from "../../redux/actions/commentsActions/commentsActions";
import { hideCommentBox } from "../../redux/actions/HighlightCommentActions";
import { ShowMessage } from "../../redux/actions/SnackBarAction";

export class UnConnectedCommentPopupBox extends React.Component {
  state = {
    comment: {
      body: ""
    }
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      comment: {
        body: event.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      comment: { body }
    } = this.state;
    const { createComment, ShowMessage } = this.props;
    const {
      article: { slug },
      highlight
    } = this.props;
    createComment(slug, {
      body,
      highlighted_text: highlight
    })
      .then(this.handleSuccessfullCommentCreation)
      .catch(error => {
        ShowMessage({
          message:
            "Something went wrong creating the comment, please try again and make sure the comment field is not blank",
          type: "errors"
        });
      });
  };

  handleCancle = event => {
    event.preventDefault();
    const { hideCommentBox } = this.props;
    hideCommentBox({
      display: "none"
    });
  };

  handleSuccessfullCommentCreation = () => {
    const { ShowMessage, hideCommentBox } = this.props;
    this.setState({
      comment: {
        body: ""
      }
    });
    ShowMessage("Created the comment successfully.");
    hideCommentBox({
      display: "none"
    });
  };

  renderCommentPopup = () => {
    const { style } = this.props;
    const {
      comment: { body }
    } = this.state;
    return (
      <div style={style} className="comment-popup" data-test="popupbox-test">
        <div className="comment-box">
          <div className="top-section">
            <div className="top-section-text left-align">
              <span>Comment</span>
            </div>
          </div>
          <div className="middle-section">
            <div className="input-field">
              <textarea
                id=""
                placeholder="Write a comment..."
                className="materialize-textarea comment-textarea"
                data-length="120"
                onChange={this.handleChange}
                value={body}
                data-test="textbox-test"
              />
            </div>
          </div>
          <div className="bottom-section">
            <button
              onClick={this.handleSubmit}
              data-test="submit-test"
              className="waves-effect waves-grey btn-flat right orange-text"
            >
              Submit
            </button>
            <button
              className="waves-effect waves-grey btn-flat left grey-text"
              onClick={this.handleCancle}
              data-test="cancle-test"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return this.renderCommentPopup();
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  article: state.articles.article,
  highlight: state.highlight
});

export default connect(
  mapStateToProps,
  {
    createComment,
    ShowMessage,
    hideCommentBox
  }
)(UnConnectedCommentPopupBox);
