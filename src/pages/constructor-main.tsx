import React from 'react'
import mainConstructorStyle from './constructor-main.module.css'
// import AppHeader from '../components/app-header/app-header.jsx'
import BurgerIngridients from '../components/burger-ingridients/burger-ingridients'
import BurgerConstuctor from '../components/burger-constructor/burger-constructor'
import { useDispatch } from 'react-redux'
//import { SET_MODAL_SELECTOR } from '../services/actions/modal-action'
//import { getIngredients } from '../services/actions/api-action'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useAppDispatch } from '../utils/hooks/hook'
import { getIngredients } from '../services/constructor/constructor-api-slice'
//import { setFormValue, getUserRequest } from '../services/actions/form-action'

// const modalSelector = document.querySelector("#modals");

export function ConstructorMain() {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngridients />
      {/* <BurgerConstuctor /> */}
    </DndProvider>
  )
}
