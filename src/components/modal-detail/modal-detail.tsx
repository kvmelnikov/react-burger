import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../modal/modal'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
import { closeModal } from '../../services/modal/modal-slice'
import { isJSDocReturnTag } from 'typescript'

function ModalDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const ingredientDataForModal = useAppSelector((state) => state.ingredients.currentIngridient)

  const showModalIngridientDetails = useAppSelector((state) => state.modal.showModalOrderDetails)

  const handleCloseModal = () => {
    dispatch(closeModal())
    navigate('/')
  }

  const handleEscapeClose = (e: KeyboardEvent) => {
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

  return showModalIngridientDetails && ingredientDataForModal ? (
    <Modal handleCloseModal={handleCloseModal} heading='Детали ингридиента'>
      <IngredientDetails {...ingredientDataForModal} />
    </Modal>
  ) : (
    <div>нет данных дива</div>
  )
}

export default ModalDetail
