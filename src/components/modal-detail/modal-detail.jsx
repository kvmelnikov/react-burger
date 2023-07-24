import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_MODAL } from '../../services/actions/modal-action'
import Modal from '../modal/modal'
import IngridientDetails from '../ingredient-details/ingredient-details'

function ModalDetail(props) {
  const dispatch = useDispatch()

  const ingredientDataForModal = useSelector((state) => state.ingredients.currentIngridient)

  const showModalIngridientDetails = useSelector((state) => state.modal.modalIngridientDetail)

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL })
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
      <Modal heading='Детали ингридиента'>
        <IngridientDetails {...ingredientDataForModal} />
      </Modal>
    )
  )
}

export default ModalDetail
