import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyle from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props) {
  const mystyle = {
    position: "absolute",
  };

  return (
    <div className={modalStyle.__open}>
      <div className={modalStyle.__container}>
        <div
          className={`${modalStyle.__heading} text text_type_main-large mt-15`}
        >
          {props.heading}
          <div className={modalStyle.__close}>
            <CloseIcon onClick={props.handleCloseModal} />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
