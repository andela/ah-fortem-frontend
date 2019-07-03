import React from "react";

import "./styles/snackbar.css";

class Snackbar extends React.Component {
  state = {
    dismissed: false
  };
  componentDidMount() {
    const { dismiss, toast } = this.props;
    setTimeout(() => {
      if (!this.state.dismissed) {
        dismiss(toast.id);
      }
    }, 3500);
  }

  handleClose = () => {
    const { dismiss, toast } = this.props;
    this.setState({
      dismissed: true
    });
    dismiss(toast.id);
  };
  render() {
    const { toast } = this.props;
    const composedClasses =
      toast.type === "success" ? "snackbar-success" : "snackbar-error";
    return (
      <div className={composedClasses + " snackbar-item"}>
        <div className="row">
          <div className="col s11">
            <p data-test="toast-message">{toast.message}</p>
          </div>
          <div className="col s1">
            <i
              data-test="snackbar-closeicon"
              className="material-icons close-icon right"
              onClick={this.handleClose}
            >
              close
            </i>
          </div>
        </div>
      </div>
    );
  }
}

export default Snackbar;
