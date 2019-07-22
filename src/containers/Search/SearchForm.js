import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Authorsearch from "./Authorsearch";

import { renderInput } from "../../components/Input/Input";
import { re } from "../../Helpers/inputValidation";

import "./Styles/search.css";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: props.defaultTags ? props.defaultTags : "",
      author: props.defaultAuthor || "",
      title: props.defaultTitle ? props.defaultTitle : "",
      page: props.defaultPageSize ? props.defaultPageSize : 0
    };
  }

  /**
   * @description - dynamic function that changes state
   * @param - {Object} evt - the event object
   */
  handleStateChange = evt => {
    const {
      target: { value, name }
    } = evt;
    this.setState({
      [name]: value
    });
  };

  /**
   * @description - sets the authors username  to state
   * @param {string} Author - the authors username
   */
  handleSubmitUsername = author => {
    this.setState({
      author
    });
  };

  /**
   * @description - returns an object that is spread to the submit button
   * @returns {Object} - an object spread to the submit Button
   */
  submitButtonProps = () => {
    const { tag, author, title, page } = this.state;
    return re.isEmpty.test(tag) ||
      re.isEmpty.test(author) ||
      re.isEmpty.test(title) ||
      page > 0
      ? {}
      : { disabled: "disabled" };
  };

  /**
   * @description - creates the redirect link for the search
   * @returns {String} - redirect string
   */
  handleCreateRedirectLink = () => {
    const { tag, author, title, page } = this.state;

    const authorLink = !re.isEmpty.test(author) ? "" : `&author=${author}`;
    const titleLink = !re.isEmpty.test(title) ? "" : `&title=${title}`;
    const tagLink = !re.isEmpty.test(tag) ? "" : `&tags=${tag}`;
    const pageLink = page <= 0 ? "" : `&page_size=${page}`;

    return `/search?form${pageLink}${titleLink}${authorLink}${tagLink}`;
  };
  /**
   * @description - this method is responsible redirecting us to the search results page
   *
   */
  handleSearchRedirect = () => {
    const { history, callback } = this.props;
    history.push(this.handleCreateRedirectLink());
    return callback && callback();
  };

  renderNumberOfPages = () => {
    const { fullPage } = this.props;
    const { page } = this.state;
    return (
      fullPage && (
        <div className="col s12 m6">
          {renderInput(
            {
              autoFocus: true,
              id: "page",
              name: "page",
              errors: [],
              value: page,
              label: "Number of articles / page",
              type: "number"
            },
            this.handleStateChange
          )}
        </div>
      )
    );
  };

  /**
   * @description - returns the list of input field props
   */
  returnInputFieldProps = () => {
    const { tag, title } = this.state;
    return [
      {
        value: tag,
        id: "tag",
        label: "Tags",
        name: "tag"
      },
      {
        value: title,
        label: "Title",
        name: "title",
        id: "title"
      }
    ];
  };

  /**
   * @description - render form input fields
   */
  renderInputFields = () => {
    const { fullPage, defaultAuthor } = this.props;
    return (
      <div className={fullPage && "row"}>
        {this.returnInputFieldProps().map(({ value, id, label, name }, idx) => (
          <div className={fullPage && "col s12 m6"} key={id + idx}>
            {renderInput(
              {
                type: "text",
                value,
                id,
                label,
                name,
                errors: [],
                autoFocus: true
              },
              this.handleStateChange
            )}
          </div>
        ))}
        <div className={fullPage && "col s12 m6"}>
          <Authorsearch
            defaultAuthor={defaultAuthor}
            fullPage={Boolean(fullPage)}
            handleSubmitAuthor={this.handleSubmitUsername}
          />
        </div>
        {this.renderNumberOfPages()}
      </div>
    );
  };
  render() {
    const { fullPage } = this.props;
    return (
      <div>
        {!fullPage && <h5>Search for articles</h5>}
        {this.renderInputFields()}
        <div className="submit-search-container">
          <a
            className="waves-effect waves-light chip hoverable btn-small orange"
            onClick={this.handleSearchRedirect}
            {...this.submitButtonProps()}
          >
            <i className="material-icons left">search</i>Search
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
