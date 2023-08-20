import { FC, useMemo, useRef } from 'react'
import toppingStyles from './topping.module.css'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import propTypes from 'prop-types'

// import { INSERT_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/burger-action'
// import { DECREASE_COUNTER_INGREDIENT } from '../../services/actions/ingridients-action'
// import { DELETE_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/burger-action'
import { useAppDispatch } from '../../utils/hooks/hook'
import {
  ITopping,
  deleteIngredientInConstructor,
  insertIngredientInConstructor,
} from '../../services/constructor/burger-slice'
import { deacreaseCounterIngredient } from '../../services/constructor/ingredient-slice'
import { IIngredientDetails } from '../../types/types'

export const Topping: FC<{ currentIndex: number; item: ITopping }> = ({ currentIndex, item }) => {
  const dispatch = useAppDispatch()
  const { index } = item
  const dragRef = useRef(null)
  const dropRef = useRef(null)

  // item.index = index

  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { index, currentIndex },
    collect: (monitor) => {
      const result = {
        isDragging: monitor.isDragging(),
      }
      return result
    },
  })

  const [, drop] = useDrop({
    accept: 'item',
    hover(item: any, monitor) {
      if (!dropRef.current) {
        return
      }

      const hoverIndex = currentIndex
      const dragIndex = item.index

      if (dragIndex === hoverIndex) {
        return
      }

      dispatch(insertIngredientInConstructor({ dragIndex: dragIndex, hoverIndex: hoverIndex }))

      item.index = hoverIndex
    },
  })

  drag(dragRef)
  drop(dropRef)

  const handleDeleteTopping = (e: any, index: number) => {
    if (e.target.parentElement.parentElement.classList.contains('pr-2')) {
      dispatch(deacreaseCounterIngredient(item._id))
      // dispatch({ type: DELETE_INGREDIENT_IN_CONSTRUCTOR, indx: index })
      dispatch(deleteIngredientInConstructor(index))
    }
  }

  const content = useMemo(() => {
    return (
      <li
        className={`${toppingStyles.topping__list_element}`}
        ref={dropRef}
        onClick={(e) => handleDeleteTopping(e, currentIndex)}
      >
        <div className={`${toppingStyles.topping__item}`} ref={dragRef}>
          <DragIcon type='primary' />
          <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
        </div>
      </li>
    )
  }, [item])

  return content
}
