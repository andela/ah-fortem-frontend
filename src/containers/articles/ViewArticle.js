import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { viewArticle, deleteArticle } from "../../redux/actions/articleActions";
import { highlightText } from "../../redux/actions/HighlightCommentActions";
import ArticleEditor from "../../components/Article/ArticleEditor";
import { CommentsContainer } from "../Comments";
import Loader from "../../components/Article/Loader";
import "../../components/Article/styles/articles.css";
import ShareBar from "./ShareArticle";
import "../../components/Article/styles/articles.css";
import { AverageRating } from "../../components/Ratings/RatingComponent";

import Feedback from "../../components/Article/ArticleFeeback";
import FollowUnfollow from "../../containers/FollowUnfollow/FollowUnfollowContainer";

import CommentPopup from "../../components/HighlightComment/CommentPopup";
import CommentPopupBox from "../../components/HighlightComment/CommentPopupBox";
import "./style/highlight.css";
import { hideCommentBox } from "../../redux/actions/HighlightCommentActions";
export class ViewArticle extends Component {
  state = {
    comment: {
      display: "none"
    },
    commentBox: {
      display: "none",
      right: 0,
      position: "absolute",
      zIndex: 1
    }
  };
  componentDidMount() {
    this.props.viewArticle(this.props.match.params.slug);
  }

  handleDelete = slug => () => {
    const { deleteArticle } = this.props;
    const token = localStorage.getItem("token");
    return deleteArticle(slug, token).then(data => {
      this.props.history.push(`/`);
    });
  };

  handleMouseUp = event => {
    const { hideCommentBox } = this.props;
    event.preventDefault();
    hideCommentBox({
      display: "none"
    });
    this.surroundSelection();
  };

  surroundSelection = () => {
    const prevHighlight = document.getElementById("highlight");
    if (prevHighlight) {
      prevHighlight.removeAttribute("id");
    }
    const { highlightText } = this.props;
    let text;
    const s = window.getSelection();
    if (window.getSelection) {
      text = s.toString();
    } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text;
    }
    const oRange = s.getRangeAt(0);
    const oRect = oRange.getBoundingClientRect();
    const boundaryRange = oRange.cloneRange();
    const nodeElement = document.createElement("span");
    nodeElement.id = "highlight";
    nodeElement.appendChild(oRange.extractContents());
    boundaryRange.insertNode(nodeElement);
    s.removeAllRanges();
    s.addRange(boundaryRange);
    this.showCommentPopup(oRect);
    highlightText(text);
    const display = text.length > 0 ? "block" : "none";
    this.setState(({ comment }) => ({
      comment: { ...comment, display }
    }));
    return text;
  };

  position = anchor => {
    var bodyRect = document.body.getBoundingClientRect();
    const element_top = anchor.top;
    const element_left = anchor.left;
    const top = element_top - bodyRect.top - 42 + "px";
    const left = element_left + (anchor.width / 2 - 50) + "px";
    this.setState(({ commentBox }) => ({
      comment: {
        top,
        left
      },
      commentBox: {
        ...commentBox,
        top
      }
    }));
  };

  showCommentPopup = anchor => {
    let comment = document.createElement("span");
    comment.className = "highlight";
    comment.innerHTML = "comment";
    document.body.append(comment);

    this.position(anchor, comment);
  };

  render() {
    const { article } = this.props;
    const user = localStorage.getItem("username");
    const comentboxstyle = {
      ...this.state.commentBox,
      ...this.props.showCommentBox
    };
    return (
      <div>
        {article ? (
          <div data-test="view-test">
            <ShareBar article={article} />
            <div className="container" key={article.id}>
              <div className="article-title">
                <h3>{article.title}</h3>
              </div>
              <div className="article-author">
                <img
                  className="cirlce responsive-img avatar"
                  src={
                    article.author.image
                      ? article.author.image
                      : "https://cdn1.iconfinder.com/data/icons/robots-avatars-set/354/Robot_avatar___robot_robo_avatar_chatbot_chat-512.png"
                  }
                  alt="User Profile pic"
                />
                <span className="article-author-name left0a">
                  {article.author.username}
                </span>
                <FollowUnfollow
                  username={article.author.username}
                  handleOnChange={() => {}}
                />

                <div className="row article-stats">
                  <div className="left read_time">
                    <i>{article.read_time}</i>
                  </div>
                  <div className="rating right ">
                    <AverageRating
                      average={article.avg_rating}
                      count={article.rating_count}
                    />
                  </div>
                </div>
              </div>
              <div className="row" id={article.slug}>
                <div className="col m12 m7">
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                      <img
                        className="responsive-img"
                        width="20"
                        height="400"
                        src={article.image_url}
                        alt="None to show"
                      />
                    </div>
                    <div
                      id="articleview"
                      onMouseUp={this.handleMouseUp}
                      data-test="test-viewarticle"
                    >
                      <ArticleEditor
                        edit={false}
                        body={article.body}
                        getDraftJSContent={() => {}}
                      />
                    </div>
                    <div className="right-align">
                      {user === article.author.username ? (
                        <div>
                          <Link
                            className="waves-effect waves-light btn update-button"
                            to={`/edit/${article.slug}`}
                          >
                            Update
                          </Link>
                          <button
                            data-test="delete-button"
                            className="btn waves-effect waves-light delete-button"
                            onClick={this.handleDelete(article.slug)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <Feedback {...this.props} />
                  </div>
                </div>
              </div>
            </div>
            {/* comments container */}
            <div className={"container"}>
              <CommentsContainer {...{ article }} />
            </div>
          </div>
        ) : (
          <div data-test="no-view-test">
            <Loader />
          </div>
        )}
        <CommentPopupBox style={comentboxstyle} />
        <CommentPopup style={this.state.comment} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.articles.article,
  highlight: state.highlight,
  showCommentBox: state.showCommentBox
});
export default connect(
  mapStateToProps,
  { viewArticle, deleteArticle, highlightText, hideCommentBox }
)(ViewArticle);
