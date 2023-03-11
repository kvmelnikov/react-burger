import ModalOverlayStyle from './modal-overlay.module.css'
import React from "react";

function ModalOverlay(props){



    return (<div onClick={props.handleCloseModal} className={ModalOverlayStyle._open}></div>)
}

export default ModalOverlay;