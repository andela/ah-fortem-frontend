import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { postArticle } from "../../redux/actions/articleActions";
import ArticleEditor from "../../components/Article/ArticleEditor";
import { ShowMessage } from "../../redux/actions/SnackBarAction";
import Imageupload from "../../components/Imageupload/Imageupload";

export class PostArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
      body: ""
    };

    this.chipsRef = React.createRef();
    this.handleInputs = prop => {
      return event => {
        this.setState({
          [prop]: event.target.value
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
  }

  createArticle = event => {
    const { ShowMessage } = this.props;
    const token = localStorage.getItem("token");
    event.preventDefault();
    const article = {
      article: {
        title: this.state.title,
        description: this.state.description,
        body: this.state.body,
        image_url: this.state.image,
        tags: this.chipsRef.current
          ? this.chipsRef.current.M_Chips.chipsData.map(({ tag }) => tag)
          : []
      }
    };

    return this.props
      .postArticle(article, token)
      .then(article => {
        this.props.history.push(`/articles/${article.slug}`);
        ShowMessage("Article Successfully created");
      })
      .catch(err => {
        const { status } = err.response;
        if (status === 500) {
          ShowMessage({
            message: "Api Server error 500. Try sending the request again",
            type: "error"
          });
        }
        if (status === 400) {
          const { title, body, description } = err.response.data.errors;
          if (title) {
            ShowMessage({
              message: title[0] + "=> title",
              type: "error"
            });
          } else if (description) {
            ShowMessage({
              message: description[0],
              type: "error"
            });
          } else if (body) {
            ShowMessage({
              message: body[0],
              type: "error"
            });
          }
        }
      });
  };

  render() {
    return (
      <div className="container">
        <br />
        <form onSubmit={this.createArticle}>
          <div className="row">
            <div data-test="post-test">
              <input
                data-test="title-input"
                placeholder="Enter Article Title"
                id="title"
                type="text"
                className="validate"
                value={this.state.title}
                onChange={this.handleInputs("title")}
              />
            </div>
            <div className="input-field">
              <textarea
                id="description"
                className="materialize-textarea"
                placeholder="Enter Article Description"
                value={this.state.description}
                onChange={this.handleInputs("description")}
              />
              <Imageupload uploadedImageUrl={this.handleImage} />
            </div>
            <ArticleEditor edit={true} getDraftJSContent={this.handleBody} />
            <br />
            <div className="chips" ref={this.chipsRef}>
              <input
                className="custom-class"
                onChange={this.handleChips}
                placeholder="Tags"
              />
            </div>
            <br />
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Publish
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    { postArticle, ShowMessage }
  )(PostArticle)
);
