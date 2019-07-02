import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { viewArticle, deleteArticle } from "../../redux/actions/articleActions";
import ArticleEditor from "../../components/Article/ArticleEditor";

import "../../components/Article/styles/articles.css";

export class ViewArticle extends Component {
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

  render() {
    const { article } = this.props;
    const user = localStorage.getItem("username");
    return (
      <div>
        {article ? (
          <div data-test="view-test">
            <div className="container" key={article.id}>
              <br />
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
                <span className="article-author-name">
                  {article.author.username}
                </span>
                <div className="read_time left-align">
                  <i>{article.read_time}</i>
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
                    <div>
                      <ArticleEditor
                        edit={false}
                        body={article.body}
                        getDraftJSContent={() => {}}
                      />
                    </div>
                    <div className="user-buttons right-align">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="preloader-wrapper big active loader"
            data-test="no-view-test"
          >
            <div className="spinner-layer spinner-orange">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.articles.article
});
export default connect(
  mapStateToProps,
  { viewArticle, deleteArticle }
)(ViewArticle);
