import ModalOverlayStyle from "./modal-overlay.module.css";
import React from "react";
import propTypes from "prop-types";

function ModalOverlay(props) {
  console.log(props);
  return (
    <div
      onClick={props.handleCloseModal}
      className={ModalOverlayStyle._open}
    ></div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  handleCloseModal: propTypes.func.isRequired,
};
