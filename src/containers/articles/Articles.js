import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleCard from "../../components/Article/ArticleCard";

import Loader from "../../components/Article/Loader";
import {
  getArticles,
  getArticlesByTags
} from "../../redux/actions/articleActions";
import { ListTags } from "../../components/Tags/listTags";
import { fetchTags } from "../../redux/actions/articleTags";

export class Articles extends Component {
  componentDidMount() {
    const { fetchTags, getArticles } = this.props;
    fetchTags();
    getArticles();
  }
  render() {
    const { tags, getArticlesByTags, loadingArticles } = this.props;
    return (
      <div data-test="test-article">
        <br />
        <div className="row">
          <div className="col s3 push-s9">
            <h5>
              <b>Explore Topics</b>
            </h5>
            <ListTags tags={tags} getArticlesByTags={getArticlesByTags} />
          </div>
          <div className="col s9 pull-s3">
            {loadingArticles && <Loader />}
            {this.props.articles.map(article => (
              <div key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
  loadingArticles: state.articles.loadingArticles,
  tags: state.tags
});
export default connect(
  mapStateToProps,
  { getArticles, fetchTags, getArticlesByTags }
)(Articles);
