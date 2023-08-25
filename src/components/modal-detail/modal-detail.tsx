import Modal from '../modal/modal'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
import { closeModal } from '../../services/modal/modal-slice'

function ModalDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const ingredientDataForModal = useAppSelector((state) => state.ingredients.currentIngridient)
  const showModalIngridientDetails = useAppSelector((state) => state.modal.modalIngridientDetail)
  console.log('dfdf')
  const handleCloseModal = () => {
    dispatch(closeModal())
    navigate('/')
  }

  return showModalIngridientDetails && ingredientDataForModal ? (
    <Modal handleCloseModal={handleCloseModal} heading='Детали ингридиента'>
      <IngredientDetails
        image_large={ingredientDataForModal.image_large}
        name={ingredientDataForModal.name}
        calories={ingredientDataForModal.calories}
        proteins={ingredientDataForModal.proteins}
        fat={ingredientDataForModal.fat}
        carbohydrates={ingredientDataForModal.carbohydrates}
      />
    </Modal>
  ) : (
    <div>нет данных дива</div>
  )
}

export default ModalDetail
