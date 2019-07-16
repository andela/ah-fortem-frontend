import React from "react";
import Rater from "react-rater";
import "../../assets/css/react-rater.scss";

export const AverageRating = props => {
  return (
    <div>
      <Rater total={5} rating={props.average} interactive={false} />
      <span className="score">
        <i>
          &nbsp;
          {props.average.toFixed(1)} ({props.count})
          <small> Average Rating</small>
        </i>
      </span>{" "}
    </div>
  );
};
export const StarRating = props => {
  return <Rater total={5} rating={props.average} interactive={false} />;
};
