import { FC } from 'react'
import modalStyle from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createPortal } from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { IModal } from '../../types/types-modal'
const modalSelector = document.querySelector('#modals')

const Modal: FC<IModal> = (props) => {
  return createPortal(
    <>
      <ModalOverlay handleCloseModal={props.handleCloseModal} />
      <div className={modalStyle.__open}>
        <div className={modalStyle.__container}>
          <div className={`${modalStyle.__heading} text text_type_main-large mt-15`}>
            {props.heading}
            <div className={modalStyle.__close}>
              <CloseIcon type='primary' onClick={props.handleCloseModal} />
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </>,
    modalSelector as HTMLElement,
  )
}

export default Modal
