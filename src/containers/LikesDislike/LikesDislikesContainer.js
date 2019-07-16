import React, { Component } from "react";
import { connect } from "react-redux";
import LikesDislike from "../../components/LikeAndDIslike/LikeAndDislike";
import {
  getLikes,
  postLikes,
  deleteLikes
} from "../../redux/actions/likesDislikesActions/likesDislikesActions";

export class LikesDislikeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: {
        className: "",
        clicked: false
      },
      dislike: {
        className: "",
        clicked: false
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const {
      getLikes,

      article: { slug }
    } = this.props;
    return getLikes(slug).then(() => {
      const {
        likesCount: { user }
      } = this.props;
      this.setState({
        [user]: { className: "blue-text", clicked: true }
      });
    });
  }
  componentDidUpdate() {}
  handleClick(action) {
    const {
      postLikes,
      deleteLikes,
      article: { slug }
    } = this.props;
    return event => {
      const clickedBefore = this.state[action]["clicked"];
      if (clickedBefore === true) {
        this.setState({ [action]: { className: "", clicked: false } });
        deleteLikes(slug);
      } else {
        this.setState({ [action]: { className: "blue-text", clicked: true } });
        postLikes({ action }, slug);
      }
      const otherAction = action === "like" ? "dislike" : "like";
      this.setState({ [otherAction]: { className: "", clicked: false } });
    };
  }
  render() {
    return (
      <LikesDislike
        handleClick={this.handleClick}
        props={this.props}
        {...this.state}
      />
    );
  }
}
const mapStateToProps = state => ({
  article: state.articles.article,
  likesCount: state.articles.likesCount
});

export default connect(
  mapStateToProps,
  { getLikes, postLikes, deleteLikes }
)(LikesDislikeContainer);
