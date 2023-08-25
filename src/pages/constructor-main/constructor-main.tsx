import React from 'react'
import BurgerIngridients from '../../components/burger-ingridients/burger-ingredients'
import BurgerConstuctor from '../../components/burger-constructor/burger-constructor'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAppDispatch } from '../../utils/hooks/hook'
import { getIngredients } from '../../services/constructor/constructor-api-slice'

export function ConstructorMain() {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngridients />
      <BurgerConstuctor />
    </DndProvider>
  )
}
