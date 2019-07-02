import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateArticle, viewArticle } from "../../redux/actions/articleActions";
import ArticleEditor from "../../components/Article/ArticleEditor";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import Imageupload from "../../components/Imageupload/Imageupload";

export class EditArticle extends Component {
  constructor(props) {
    super(props);
    const { article } = this.props;
    this.state = {
      title: article.title,
      description: article.description,
      image: article.image_url,
      body: article.body
    };

    this.chipsRef = React.createRef();
    this.handleChanges = key => {
      return event => {
        this.setState({
          [key]: event.target.value
        });
      };
    };
    this.handleBody = body => {
      this.setState({
        body
      });
    };

    this.handleImage = image => {
      this.setState({
        image
      });
    };

    this.UpdateArticle = event => {
      event.preventDefault();

      const token = localStorage.getItem("token");
      const { ShowMessage, updateArticle, history } = this.props;
      const articleData = {
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
        image_url: this.state.image
      };

      return updateArticle(article.slug, articleData, token).then(data => {
        history.push(`/articles/${data.slug}`);
        ShowMessage("Successfully updated your article");
      });
    };
  }

  componentDidMount() {
    this.props.viewArticle(this.props.match.params.slug);
  }

  render() {
    return (
      <div className="container" data-test="edit-test">
        <br />
        <div className="card">
          <div className="card-content">
            <br />
            <form onSubmit={this.UpdateArticle}>
              <div className="row">
                <div>
                  <input
                    data-test="edit-input"
                    id="title"
                    type="text"
                    className="validate"
                    value={this.state.title}
                    onChange={this.handleChanges("title")}
                  />
                </div>
                <div className="input-field">
                  <textarea
                    id="description"
                    className="materialize-textarea"
                    value={this.state.description}
                    onChange={this.handleChanges("description")}
                  />
                  <Imageupload uploadedImageUrl={this.handleImage} />
                </div>
                <ArticleEditor
                  edit={true}
                  body={this.state.body}
                  getDraftJSContent={this.handleBody}
                />
                <br />
                <button
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.articles.article
});

export default withRouter(
  connect(
    mapStateToProps,
    { updateArticle, viewArticle, ShowMessage }
  )(EditArticle)
);
