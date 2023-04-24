import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyle from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import propTypes from "prop-types";
import {useSelector, useDispatch} from 'react-redux';
import { CLOSE_MODAL } from "../../services/actions";

function Modal(props) {

  const dispatch = useDispatch()
  const modalSelector = useSelector((state) => state.modal.modalSelector)  
  
  const handleCloseModal = () =>{
    dispatch({type: CLOSE_MODAL})
  }
  
  const handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, []);

  return (
    createPortal(
      <>
      <ModalOverlay handleCloseModal={handleCloseModal} />
      <div className={modalStyle.__open}>
      <div className={modalStyle.__container}>
        <div
          className={`${modalStyle.__heading} text text_type_main-large mt-15`}>
          {props.heading}
          <div className={modalStyle.__close}>
            <CloseIcon onClick={handleCloseModal} />
          </div>
        </div>
        {props.children}
      </div>
    </div>
    </>, modalSelector
    )
  );
}

export default Modal;

// Modal.propTypes  = {
//   modalSelector: propTypes.object.isRequired,
//   children: propTypes.object,
//   heading: propTypes.string,
//   handleCloseModal: propTypes.func.isRequired,

// }
