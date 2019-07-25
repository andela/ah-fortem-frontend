import React from "react";
import image from "../../assets/images/comment-icon.png";
import "./styles/commentPopup.css";
import { connect } from "react-redux";
import {
  showCommentBox,
  hideCommentBox
} from "../../redux/actions/HighlightCommentActions";

export class UnconnectedCommentPopup extends React.Component {
  state = {
    popupBox: {
      display: "none"
    }
  };

  handleClick = event => {
    const { showCommentBox } = this.props;
    event.preventDefault();
    showCommentBox({
      display: "block"
    });
  };

  render() {
    const { style } = this.props;
    return (
      <div
        style={style}
        className="highlight"
        onClick={this.handleClick}
        data-test="commentPopup-test"
      >
        <div className="popup-box">
          <div className="top-bar">
            <div className="top-bar-content">
              <div className="comment-icon">
                <img
                  src={image}
                  alt="comment"
                  className="responsive-img comment-img"
                />
              </div>
            </div>
          </div>
          <div className="bottom-bar"></div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    showCommentBox,
    hideCommentBox
  }
)(UnconnectedCommentPopup);
