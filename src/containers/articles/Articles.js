import React, { Component } from "react";
import { connect } from "react-redux";
<<<<<<< HEAD
import ArticleCard from "../../components/Article/ArticleCard";
=======
import ArticleCard from "../../components/articles/ArticleCard";
>>>>>>> 166980308-story(articles): CRUD operations for articles
import { getArticles } from "../../redux/actions/articleActions";

export class Articles extends Component {
  componentDidMount() {
    this.props.getArticles();
  }
  render() {
<<<<<<< HEAD
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
=======
    return this.props.articles.map(article => (
      <div>
        <ArticleCard article={article} />
      </div>
    ));
>>>>>>> 166980308-story(articles): CRUD operations for articles
  }
}

const mapStateToProps = state => ({
  articles: state.articles.articles
});
export default connect(
  mapStateToProps,
  { getArticles }
)(Articles);
