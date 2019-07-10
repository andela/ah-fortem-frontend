import React from "react";
import { connect } from "react-redux";
import { DismissMessage } from "../../redux/actions/SnackBarAction";
import "./styles/snackbar.css";
import Snackbar from "../../components/Snackbars/Snackbar";

export const unconnectedsnackBarHoc = Component => {
  class InSnackbarHoc extends React.Component {
    render() {
      const { toasts, DismissMessage } = this.props;
      return (
        <div>
          <Component {...this.props} />
          <div className="snackbar-container">
            {toasts.map(toast => (
              <Snackbar
                key={toast.id}
                dismiss={id => {
                  DismissMessage(id);
                }}
                {...{ toast }}
              />
            ))}
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = state => ({ toasts: state.toasts });
  return connect(
    mapStateToProps,
    { DismissMessage }
  )(InSnackbarHoc);
};

export default unconnectedsnackBarHoc;
