import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyle from './modal.module.css'


function Modal(props) {
    

    return (
        <div className={modalStyle._open}>
            <button onClick={props.handleCloseModal}>close</button>
            {props.children}
        </div>      
        )
}

export default Modal;