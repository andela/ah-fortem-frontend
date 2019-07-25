import React, { Component } from "react";
import { connect } from "react-redux";
import {
  postCommentLikes,
  deleteCommentLike
} from "../../redux/actions/commentsActions/CommentsLikeDislikeActions";

export class CommentsLikeDislike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentLike: {
        className: "",
        clicked: false
      },
      commentDislike: {
        className: "",
        clicked: false
      }
    };
  }
  componentDidMount() {
    const userAction = this.props.comment.likesCount.userAction;
    this.setState({
      [userAction]: { className: "blue-text", clicked: true }
    });
  }

  handleChange(type, id) {
    const { postCommentLikes, deleteCommentLike } = this.props;
    return event => {
      const clickedBefore = this.state[type]["clicked"];
      if (clickedBefore === true) {
        this.setState({ [type]: { className: "", clicked: false } });
        deleteCommentLike(id, type);
      } else {
        this.setState({ [type]: { className: "blue-text", clicked: true } });
        const action = type === "commentLike" ? "like" : "dislike";
        postCommentLikes({ action }, id);
      }
      const otherAction =
        type === "commentLike" ? "commentDislike" : "commentLike";
      this.setState({ [otherAction]: { className: "", clicked: false } });
    };
  }
  render() {
    const { comment } = this.props;
    const { commentLike, commentDislike } = this.state;
    const className = "waves-effect waves-teal btn-flat ";
    return (
      <div className="left-align" data-test="test-btn">
        <button
          className={className + commentLike.className}
          onClick={this.handleChange("commentLike", comment.id)}
          data-test="testBtn"
        >
          <i className="material-icons Small likeIcon">thumb_up</i>
          <span> &nbsp;{comment.likesCount.likes}</span>
        </button>
        <button
          data-test="delTestBtn"
          className={className + commentDislike.className}
          onClick={this.handleChange("commentDislike", comment.id)}
        >
          <i className="material-icons Small likeIcon">thumb_down</i>
          <span> &nbsp;{comment.likesCount.dislikes}</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { postCommentLikes, deleteCommentLike }
)(CommentsLikeDislike);
