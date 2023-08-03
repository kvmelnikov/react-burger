import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_MODAL } from '../../services/actions/modal-action'
import Modal from '../modal/modal'
import IngridientDetails from '../ingredient-details/ingredient-details'
import { useNavigate } from 'react-router-dom'

function ModalDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ingredientDataForModal = useSelector((state) => state.ingredients.currentIngridient)

  const showModalIngridientDetails = useSelector((state) => state.modal.modalIngridientDetail)

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL })
    navigate('/')
  }

  const handleEscapeClose = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeClose)

    return () => {
      document.removeEventListener('keydown', handleEscapeClose)
    }
  }, [])

  return (
    showModalIngridientDetails && (
      <Modal handleCloseModal={handleCloseModal} heading='Детали ингридиента'>
        <IngridientDetails {...ingredientDataForModal} />
      </Modal>
    )
  )
}

export default ModalDetail
