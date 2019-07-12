import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleCard from "../../components/Article/ArticleCard";
import { getArticles } from "../../redux/actions/articleActions";

export class Articles extends Component {
  componentDidMount() {
    this.props.getArticles();
  }
  render() {
    return (
      <div data-test="test-article">
        <br />
        <div className="row">
          <div className="col s9">
            {this.props.articles.map(article => (
              <div>
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
  articles: state.articles.articles
});
export default connect(
  mapStateToProps,
  { getArticles }
)(Articles);
