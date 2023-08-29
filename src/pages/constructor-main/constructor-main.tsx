import BurgerIngridients from '../../components/burger-ingridients/burger-ingredients'
import BurgerConstuctor from '../../components/burger-constructor/burger-constructor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export function ConstructorMain() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngridients />
      <BurgerConstuctor />
    </DndProvider>
  )
}
