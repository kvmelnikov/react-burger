import Modal from '../modal/modal'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
import { closeModal } from '../../services/modal/modal-slice'
import { getIngredients } from '../../services/constructor/constructor-api-slice'
import { useEffect, useMemo } from 'react'
import { setCurrentIngredient } from '../../services/constructor/ingredient-slice'
import { stat } from 'fs'

function ModalDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const path = useLocation().pathname
  const ingredientDataForModal = useAppSelector((state) => state.ingredients.currentIngridient)
  const ingredients = useAppSelector((state) => state.ingredients.ingredients)

  const showModalIngridientDetails = useAppSelector((state) => state.modal.modalIngridientDetail)
  console.log('dfdf')
  const handleCloseModal = () => {
    dispatch(closeModal())
    navigate('/')
  }

  useEffect(() => {
    if (ingredients) {
      dispatch(setCurrentIngredient(path.split('/')[2]))
    }
  }, [ingredients])

  const content = useMemo(() => {
    if (showModalIngridientDetails && ingredientDataForModal) {
      return (
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
      )
    } else if (ingredientDataForModal && !showModalIngridientDetails) {
      navigate(`/ingredients/${path.split('/')[2]}`)

      return <div></div>
    } else {
      return <div></div>
    }
  }, [ingredientDataForModal, showModalIngridientDetails])

  return content
}

export default ModalDetail
