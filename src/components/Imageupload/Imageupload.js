import React from "react";
import { connect } from "react-redux";

import { ShowMessage } from "../../redux/actions/SnackBarAction";
import imageupload from "../../Helpers/imageupload";

/**
 * props = {
 * uploadedImageUrl: fn() - passes the link of the successful message
 * }
 */
class Imageupload extends React.Component {
  state = {
    sending: false
  };
  handleUploadFile = event => {
    const { uploadedImageUrl, ShowMessage } = this.props;
    const file = event.target.files[0];
    this.setState({
      sending: true
    });
    let formData = new FormData();
    formData.append("image", file);
    formData.append("name", file.name);
    return imageupload(formData)
      .then(({ data: { data: { link } } }) => {
        uploadedImageUrl(link);
        this.setState({
          sending: false
        });
      })
      .catch(() => {
        ShowMessage({
          message: "The upload functionality failed, kindly try again.",
          type: "error"
        });
        this.setState({
          sending: false
        });
      });
  };
  render() {
    const { sending } = this.state;
    return (
      <div>
        <div className="file-field input-field">
          <div className="btn orange darken-1">
            <span>
              {sending ? (
                <div data-test="uploading-file">Uploading...</div>
              ) : (
                <div data-test="file-label">File</div>
              )}
            </span>
            <input type="file" onChange={this.handleUploadFile} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    ShowMessage
  }
)(Imageupload);
