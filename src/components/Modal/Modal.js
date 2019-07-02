import React from "react";
import { Keyframes } from "react-spring/renderprops.cjs.js";

import "./styles/modal.css";

/**
 * @param state - string either show | hide - toggles between the two
 *              stylings defined in the Springs({}) object
 * @returns renderProp with the styling configuration passed as a parameter
 *
 */
const Container = Keyframes.Spring({
  show: {
    opacity: 1,
    transform: "translate3d(0,0,0)",
    width: 100,
    height: "auto"
  },
  hide: {
    transform: "translate3d(0,-10px,0)",
    opacity: 0,
    width: 0,
    height: 0
  }
});

/**
 *
 * @param {Object} {
 *  @property state - The state of the modal, either show or hide
 *  @property children - React component that is passed as a child
 *  @property closeModal - Function called by the closeicon to close the modal
 *
 * }
 */

const Modal = ({ state = "hide", children, closeModal }) => {
  return (
    <div>
      <Container state={state}>
        {props => (
          <div
            className="frame card"
            style={{
              ...props,
              width: `${props.width}%`,
              height: `${props.height}`
            }}
          >
            <div
              data-test="modal-close"
              className="closeicon"
              onClick={closeModal}
            >
              <i className="small material-icons">close</i>
            </div>
            {children}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Modal;
