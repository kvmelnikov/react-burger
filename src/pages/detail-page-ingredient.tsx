import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../utils/hooks/hook'
import { IngredientDetails } from '../components/ingredient-details/ingredient-details'
import { getIngredients } from '../services/constructor/constructor-api-slice'
import { setCurrentIngredient } from '../services/constructor/ingredient-slice'
import { IIngredientDetails } from '../types/types'

export function DetailPageIngredient() {
  const path = useLocation().pathname
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (path !== '/') {
      dispatch(getIngredients(path.split('/')[2]))
    }
  }, [path])

  const ingredientDataForModal = useAppSelector((state) => state.ingredients.currentIngridient)

  if (ingredientDataForModal) {
    return (
      <IngredientDetails
        image_large={ingredientDataForModal.image_large}
        name={ingredientDataForModal.name}
        calories={ingredientDataForModal.calories}
        proteins={ingredientDataForModal.proteins}
        fat={ingredientDataForModal.fat}
        carbohydrates={ingredientDataForModal.carbohydrates}
      />
    )
  } else {
    return <div></div>
  }
}
