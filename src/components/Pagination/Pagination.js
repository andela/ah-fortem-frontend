import React from "react";
import "../../assets/css/pagination.css";

export default class Pagination extends React.Component {
  generateArray = count => Array.from(Array(count).keys()).map(idx => idx + 1);

  computeLen = () => {
    const { count } = this.props;
    const pages = count / 10;

    return Number.isInteger(pages)
      ? this.generateArray(pages)
      : this.generateArray(Math.ceil(pages));
  };

  getLink = (type, active, func, l = null) => {
    const val = type === "prev" ? active - 1 : active + 1;
    const data = type === "next" ? active === l : active === 1;
    return (
      <li className={`waves-effect ${data && "disabled disabler"}`}>
        <a onClick={func(val)}>
          {type === "prev" ? (
            <i className="material-icons">chevron_left</i>
          ) : (
            <i className="material-icons">chevron_right</i>
          )}
        </a>
      </li>
    );
  };

  render() {
    const { active, handleNewPagination } = this.props;
    const l = this.computeLen().length;
    return (
      <div data-test="test-page">
        <ul className="pagination center-align orange-darken-1">
          {this.getLink("prev", active, handleNewPagination)}
          {this.computeLen().map(num => (
            <li
              className={`waves-effect ${num === active && "active"}`}
              key={num}
            >
              <a onClick={handleNewPagination(num)}>{num}</a>
            </li>
          ))}
          {this.getLink("next", active, handleNewPagination, l)}
        </ul>
      </div>
    );
  }
}
