import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleCard from "../../components/Article/ArticleCard";
import Pagination from "../../components/Pagination/Pagination";

import Loader from "../../components/Article/Loader";
import {
  getArticles,
  getArticlesByTags
} from "../../redux/actions/articleActions";
import { ListTags } from "../../components/Tags/listTags";
import { fetchTags } from "../../redux/actions/articleTags";

export class Articles extends Component {
  state = {
    active: 1
  };
  componentDidMount() {
    const { fetchTags, getArticles } = this.props;
    fetchTags();
    getArticles();
  }

  handleNewPagination = page => () => {
    const { getArticles } = this.props;
    this.setState({
      active: page
    });
    getArticles(page);
  };

  renderPagination = () => {
    return (
      <Pagination
        getArticles={this.props.getArticles}
        count={this.props.count}
        active={this.state.active}
        handleNewPagination={this.handleNewPagination}
      />
    );
  };

  renderArticle = () => {
    return (
      <div className="row">
        {this.props.articles.map(article => (
          <div key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { tags, getArticlesByTags, loadingArticles } = this.props;
    return (
      <div data-test="test-article">
        <br />
        <div className="row">
          <div>
            <div className="col s9">
              <h5 className="gray-text">Latest Articles</h5>
              <br />
              {loadingArticles && <Loader />}
              <div data-test="card-test">{this.renderArticle()}</div>
              <div>{this.renderPagination()}</div>
            </div>
            <div className="col s3">
              <h5 className="gray-text">Explore Topics</h5>
              <ListTags tags={tags} getArticlesByTags={getArticlesByTags} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
  loadingArticles: state.articles.loadingArticles,
  tags: state.tags,
  count: state.articles.count
});
export default connect(
  mapStateToProps,
  { getArticles, fetchTags, getArticlesByTags }
)(Articles);
