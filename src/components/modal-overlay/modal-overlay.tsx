import ModalOverlayStyle from './modal-overlay.module.css'
import { FC } from 'react'
import { IModalOverlay } from '../../types/types-modal'

const ModalOverlay: FC<IModalOverlay> = ({ handleCloseModal }) => {
  return <div onClick={handleCloseModal} className={ModalOverlayStyle._open}></div>
}

export default ModalOverlay
