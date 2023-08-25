import React, { useEffect, FC } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientDetailsStyles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../utils/hooks/hook'

interface IPropsIngredientsDeatails {
  image_large: string
  name: string
  calories: number
  proteins: number
  fat: number
  carbohydrates: number
}

export const IngredientDetails: FC<IPropsIngredientsDeatails> = ({
  image_large,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className={ingredientDetailsStyles.details__container}>
      <img src={image_large} alt={name} />
      <p className='text text_type_main-medium mt-4 mb-8'>{name}</p>
      <div className={`${ingredientDetailsStyles.nutritionals} mb-15`}>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
          <p
            className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}
          >
            {calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
          <p
            className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}
          >
            {proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
          <p
            className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}
          >
            {fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.element_nutritional}>
          <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
          <p
            className={`text text_type_main-default text_color_inactive ${ingredientDetailsStyles.element_nutritional_digits}`}
          >
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  )
}
