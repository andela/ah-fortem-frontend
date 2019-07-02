import React, { Component } from "react";
import { connect } from "react-redux";
import { viewArticle } from "../../redux/actions/articleActions";

export class ViewArticle extends Component {
  componentDidMount() {
    this.props.viewArticle(this.props.match.params.slug);
  }
  render() {
    const articlesList = [this.props.article];
    const article = articlesList.map(
      ({
        id,
        title,
        description,
        body,
        image_url,
        author,
        created_at,
        updated_at,
        slug
      }) => (
        <div className="container" key={id}>
          <div className="row" id={slug}>
            <div className="col m12 m7">
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    width="20"
                    height="400"
                    src="https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="None to show"
                  />
                  <span className="card-title">{title}</span>
                </div>
                <div className="card-content">
                  <p>{body}</p>
                </div>
                <div className="card-action" />
              </div>
            </div>
          </div>
        </div>
      )
    );
    return (
      <div>
        <main>{article}</main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.articles.article
});
export default connect(
  mapStateToProps,
  { viewArticle }
)(ViewArticle);
