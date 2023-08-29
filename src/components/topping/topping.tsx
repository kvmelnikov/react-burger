import { FC, useMemo, useRef } from 'react'
import toppingStyles from './topping.module.css'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch } from '../../utils/hooks/hook'
import {
  ITopping,
  deleteIngredientInConstructor,
  insertIngredientInConstructor,
} from '../../services/constructor/burger-slice'
import { deacreaseCounterIngredient } from '../../services/constructor/ingredient-slice'

export const Topping: FC<{ currentIndex: number; item: ITopping }> = ({ currentIndex, item }) => {
  const dispatch = useAppDispatch()
  const { index } = item
  const dragRef = useRef(null)

  const [, drag] = useDrag({
    type: 'item',
    item: { index, currentIndex },
  })

  const [, drop] = useDrop({
    accept: 'item',
    hover(item: any, monitor) {
      if (!dragRef.current) {
        return
      }

      const hoverIndex = currentIndex
      const dragIndex = item.index

      dispatch(insertIngredientInConstructor({ dragIndex: dragIndex, hoverIndex: hoverIndex }))

      item.index = hoverIndex
    },
  })

  drag(drop(dragRef))

  const handleDeleteTopping = (e: React.SyntheticEvent<HTMLElement>, index: number) => {
    if (e.target.toString().split(' ')[1] === 'SVGPathElement]') {
      dispatch(deacreaseCounterIngredient(item._id))
      dispatch(deleteIngredientInConstructor(index))
    }
  }

  const content = useMemo(() => {
    return (
      <li
        ref={dragRef}
        className={`${toppingStyles.topping__item}`}
        onClick={(e) => handleDeleteTopping(e, currentIndex)}
      >
        <DragIcon type='primary' />
        <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
      </li>
    )
  }, [item])

  return content
}
