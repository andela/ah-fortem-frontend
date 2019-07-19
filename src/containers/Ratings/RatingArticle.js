import React, { Component } from "react";
import Rater from "react-rater";
import { connect } from "react-redux";
import { setRating, getRating } from "../../redux/actions/ratingActions";

const token = localStorage.getItem("token");
export class Rating extends Component {
  handleRate = ({ rating }) => {
    const {
      article: { id, title },
      viewArticle,
      match: {
        params: { slug }
      }
    } = this.props;
    this.props
      .setRating(id, { rating: { rating: rating } }, token, title)
      .then(() => {
        viewArticle(slug);
      });
  };
  componentDidMount() {
    const { getRating } = this.props;
    const {
      article: { id }
    } = this.props;
    getRating(id, token);
  }

  render() {
    const { ratings } = this.props;
    return (
      <div
        className="right-align grey-text text-darken-4"
        data-test="article-rating"
      >
        <span className="rate-title card-title">Rate this Article</span>
        <Rater
          id="rater"
          data-test="on-rate"
          rating={ratings}
          total={5}
          onRate={this.handleRate.bind(this)}
        />{" "}
        <span className="score center-align">
          {ratings ? ratings.toFixed(1) : 0}
        </span>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ratings: state.ratings
});
export default connect(
  mapStateToProps,
  { setRating, getRating }
)(Rating);
