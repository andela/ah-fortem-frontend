import React, { Component } from "react";

import Downshift from "downshift";
import { debounce } from "throttle-debounce";
import placeholderimage from "../../assets/images/user.png";
import Searchresults from "../../components/Search/SearchResults";

import { apiCalls } from "../../Helpers/axios";
import { re } from "../../Helpers/inputValidation";

import "./Styles/authorsearch.css";

class Authorsearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.defaultAuthor || "",
      users: [],
      isLoading: false
    };
  }

  /**
   * @description - changes name value & calls handleFetch if name is not empty
   * @param {Object} evt - event object
   */
  handleNameChange = evt => {
    const {
      target: { value }
    } = evt;
    this.setState({
      name: value
    });
    return re.isEmpty.test(value) && this.handleFetch();
  };

  /**
   * @description - this method is throttled after 500ms
   * * we dont want to search for users on each instance of the name changing
   * checkout https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
   */
  handleFetch = debounce(500, () => {
    const { name } = this.state;
    return apiCalls("get", `/profiles/list/?search=${name}`).then(
      ({ data }) => {
        this.setState({
          users: data
        });
      }
    );
  });

  /**
   * @description - grab the username from the Author object and send it to the
   * parent Search Component
   * @param {Object | null} Author object or null if user clears the input
   */
  handleSubmitAuthor = author => {
    const { handleSubmitAuthor } = this.props;
    if (author) {
      this.setState({
        name: author.username
      });
      handleSubmitAuthor(author.username);
    } else {
      this.setState({
        name: ""
      });
      handleSubmitAuthor("");
    }
  };

  /**
   * @description - this method renders the search results
   */
  renderSearchResults = props => {
    const { name, users } = this.state;
    return (
      <div>
        <label {...props.getLabelProps()}>Enter Author Name</label>
        <input
          {...props.getInputProps({
            onChange: this.handleNameChange,
            value: name
          })}
        />
        <ul
          {...props.getMenuProps()}
          className={`collection ${props.isOpen} collection-results`}
        >
          {props.isOpen && (
            <Searchresults
              {...{
                users,
                inputValue: props.inputValue,
                getItemProps: props.getItemProps,
                selectedItem: props.selectedItem,
                placeholderimage
              }}
            />
          )}
        </ul>
      </div>
    );
  };

  render() {
    const { fullPage } = this.props;
    return (
      <div>
        <div className={!fullPage ? "author-selection-box" : ""}>
          <Downshift
            onChange={this.handleSubmitAuthor}
            itemToString={item => (item ? item.username : "")}
          >
            {this.renderSearchResults}
          </Downshift>
        </div>
      </div>
    );
  }
}

export default Authorsearch;
