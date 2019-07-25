import React, { Component } from "react";
import qs from "query-string";
import { withRouter } from "react-router-dom";
import { Spring, Trail } from "react-spring/renderprops.cjs.js";

import { connect } from "react-redux";

import ArticleCard from "../../components/Article/ArticleCard";
import Pagination from "../../components/Pagination/Pagination";
import LoadingArticles from "../../components/Search/SearchLoading";
import FailedToFindArticles from "../../components/Search/NoArticlesFound";
import Searchform from "./SearchForm";
import "./Styles/Searchpage.css";

import { fetchArticlesToBeSearched } from "../../redux/actions/searchActions/searchActions";
export class Search extends Component {
  state = {
    activePage: 1,
    filter: false
  };

  /**
   * @description - removes the %20 in string urls
   * @returns {String} - clean url
   */
  decodeUri = str => str.replace(/%20/g, " ");
  componentDidMount() {
    const { fetchArticlesToBeSearched } = this.props;
    this.setState({
      activePage:
        "page" in this.parseParams() ? Number(this.parseParams()["page"]) : 1
    });
    return fetchArticlesToBeSearched(this.handleResolveSearchString());
  }

  /**
   *
   * @param {Object} prevProps - the previous this.props. We need this to compare with the current props
   * to see if the url params have upadted.
   */
  componentDidUpdate(prevProps) {
    const { fetchArticlesToBeSearched } = this.props;
    if (this.props.location.search !== prevProps.location.search) {
      fetchArticlesToBeSearched(this.handleResolveSearchString());
    }
  }

  /**
   * @description - this method parses the parameters in the url
   * @returns {Object} - the parsed params
   */
  parseParams = () => {
    const {
      location: { search }
    } = this.props;

    return qs.parse(search, {
      ignoreQueryPrefix: true
    });
  };

  /**
   * @description - this method returns the a formatted string of the search query
   * @returns {String}
   */
  handleResolveSearchString = () => {
    const query = this.parseParams();
    const uri =
      "s" in query
        ? `/articles?title=${query["s"]}`
        : this.handleGenerateSearchUrlFromForm({ query });
    return this.decodeUri(uri);
  };

  /**
   * @description - generates the url from the form fields
   * @param {Object} Query - this is the query object
   * @returns {String} - backend url param for searching.
   */
  handleGenerateSearchUrlFromForm = ({ url = "/articles?", query }) => {
    return Object.entries(query).reduce((acc, curr) => {
      const [prop, value] = curr;
      if (prop !== "form" && prop) {
        return acc.concat(`${prop}=${value}&`);
      } else {
        return acc;
      }
    }, url);
  };

  /***
   * @description - renders the loading indicator when searching
   * @returns {JSX | null} - React Node or null if loading is false
   */
  renderLoadingIndicator = () => {
    const { search } = this.props;
    return search.isLoading && <LoadingArticles />;
  };

  /**
   * @description - renders the articles fetched
   * @returns {JSX | null} - React Node or null if no article has been found
   */
  renderArticlesFound = () => {
    const {
      search: {
        searchResults: { articles },
        isLoading
      }
    } = this.props;

    return (
      !isLoading && (
        <div className="row">
          <Trail
            items={articles}
            keys={item => item.slug}
            from={{ transform: "translate3d(0,20px,0)", opacity: 0 }}
            to={{ transform: "translate3d(0,0px,0)", opacity: 1 }}
          >
            {article => props => (
              <div key={article.slug} style={props}>
                <ArticleCard {...{ article }} />
              </div>
            )}
          </Trail>
        </div>
      )
    );
  };

  fetchNextOrPreviousPage = page => () => {
    const { history } = this.props;
    this.setState({
      activePage: page
    });
    const query = { ...this.parseParams(), page };
    history.push(
      this.handleGenerateSearchUrlFromForm({ url: "/search?", query })
    );
  };

  /**
   * @description - the pagination component is only rendered IFF
   *                theres a page_count parameter
   * @returns {JSX | null} - React Node or null if no page_count is not provided
   */
  renderPaginationComponent = () => {
    const {
      search: {
        searchResults: { count, articles },
        isLoading
      }
    } = this.props;
    const { activePage } = this.state;
    return (
      "page_size" in this.parseParams() &&
      !isLoading &&
      articles.length && (
        <Pagination
          {...{ count }}
          active={activePage}
          handleNewPagination={this.fetchNextOrPreviousPage}
          pageDelimeter={this.parseParams()["page_size"]}
        />
      )
    );
  };

  /**
   * @description - this function renders when no articles have been found
   * @returns {JSX}
   */
  renderFailedToFindArticles = () => {
    const {
      search: {
        searchResults: { articles },
        isLoading
      }
    } = this.props;
    return (
      !isLoading &&
      !articles.length && (
        <FailedToFindArticles
          title="No Content Found"
          body="Sorry, we could not find any articles 
          that you were looking for.
      Hit the try again button to enter a new search"
          action="Try again"
          handleNewSearch={this.handleToggleFilter}
        />
      )
    );
  };

  /**
   * @description - toggles the filter prop
   */
  handleToggleFilter = () => {
    this.setState(({ filter }) => ({
      filter: !filter
    }));
  };
  /**
   * @description - this method renders the filter button
   */
  renderToggleFilterSearch = () => {
    return (
      <div className="search-header-container">
        <br />
        <button
          onClick={this.handleToggleFilter}
          className="btn waves-effect waves-light orange"
        >
          Filter
          <i className="material-icons right ">filter_list</i>
        </button>
      </div>
    );
  };

  /**
   * @description - renders search form when filter is on
   */
  renderSearchForm = () => {
    const { filter } = this.state;

    return (
      <div>
        <Spring
          from={{ height: 0, opacity: 0 }}
          to={{
            height: filter ? "auto" : 0,
            opacity: filter ? 1 : 0,
            display: filter ? "block" : "none"
          }}
        >
          {props => (
            <div style={props}>
              <Searchform
                callback={this.handleToggleFilter}
                fullPage
                defaultTitle={
                  this.parseParams()["title"] || this.parseParams()["s"]
                }
                defaultAuthor={this.parseParams()["author"]}
                defaultTags={this.parseParams()["tags"]}
                defaultPageSize={this.parseParams()["page_size"]}
              />
            </div>
          )}
        </Spring>
      </div>
    );
  };
  render() {
    return (
      <div className="container">
        <div className="search-header-container">
          {this.renderToggleFilterSearch()}
          {this.renderSearchForm()}
          <h5>Search Results</h5>
        </div>
        {this.renderLoadingIndicator()}
        {this.renderArticlesFound()}
        {this.renderPaginationComponent()}
        {this.renderFailedToFindArticles()}
      </div>
    );
  }
}

const mapStateToProps = ({ search }) => ({
  search
});

export const ConnectedReduxSearchComponent = connect(
  mapStateToProps,
  {
    fetchArticlesToBeSearched
  }
)(Search);

export default withRouter(ConnectedReduxSearchComponent);
