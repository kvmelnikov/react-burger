import React, { FC } from 'react'

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import ingridientStyle from './ingridient.module.css'
import propTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../utils/hooks/hook'
import { setCurrentIngredient } from '../../services/constructor/ingredient-slice'
import { showModalIngredientsDetail } from '../../services/modal/modal-slice'
import { IIngredientDetails } from '../../types/types'
const { ingridients__ingridient, ingridients__icon, ingridients__text, link } = ingridientStyle

export const Ingredient: FC<IIngredientDetails> = (props) => {
  const dispatch = useAppDispatch()

  const hanldleOpenModalIngridientDetails = () => {
    dispatch(setCurrentIngredient(props._id))
    dispatch(showModalIngredientsDetail())
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: [props],
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })
  let location = useLocation()

  return (
    <Link
      className={`${link}`}
      ref={dragRef}
      to={{
        pathname: `/ingredients/${props._id}`,
      }}
      state={{ background: location }}
      onClick={() => hanldleOpenModalIngridientDetails()}
    >
      <li className={`${ingridients__ingridient}`}>
        {props.count > 0 ? <Counter count={props.count} size='default' extraClass='m-1' /> : ''}
        <img src={props.image} alt={props.name} />
        <div className={`${ingridients__icon} mb-2`}>
          <span className={`text text_type_main-medium mr-2`}>20</span>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`text text_type_main-default ${ingridients__text}`}>{props.name}</p>
      </li>
    </Link>
  )
}
