import ModalOverlayStyle from './modal-overlay.module.css'
import React, { FC } from 'react'
import propTypes from 'prop-types'
import { IModalOverlay } from '../../types/types-modal'

const ModalOverlay: FC<IModalOverlay>  =({handleCloseModal}) => {
  return <div onClick={handleCloseModal} className={ModalOverlayStyle._open}></div>
}

export default ModalOverlay

