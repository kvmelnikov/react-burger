import React from 'react';
import mainConstructorStyle from './constructor-main.module.css';
import AppHeader from '../components/app-header/app-header.jsx';
import BurgerIngridients from '../components/burger-ingridients/burger-ingridients.jsx';
import BurgerConstuctor from '../components/burger-constructor/burger-constructor.jsx';
import { useDispatch } from 'react-redux';
import { SET_MODAL_SELECTOR } from '../services/actions/modal-action';
import { getIngredients } from '../services/actions/api-action';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setFormValue, getUserRequest } from '../services/actions/form-action';

const modalSelector = document.querySelector('#modals');

export function ConstructorMain() {
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(getUserRequest());
  // }, []);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  React.useEffect(() => {
    dispatch({ type: SET_MODAL_SELECTOR, value: modalSelector });
  }, []);

  return (
    <>
      <div className={mainConstructorStyle.body}>
        <AppHeader />
        <main className={mainConstructorStyle.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />

            <BurgerConstuctor />
          </DndProvider>
        </main>
      </div>
    </>
  );
}
