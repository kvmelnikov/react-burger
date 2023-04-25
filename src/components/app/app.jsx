import React from "react";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";
import BurgerConstuctor from "../burger-constructor/burger-constructor.jsx";
import Api from "../../utils/api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { SET_MODAL_SELECTOR } from "../../services/actions/index";
import { getIngredients } from "../../services/actions/api-action";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const modalSelector = document.querySelector("#modals");


function App() {
  const dispatch = useDispatch();
  const ingridients = useSelector((state) => state.api.ingridients);
  
  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  React.useEffect(() => {
    dispatch({ type: SET_MODAL_SELECTOR, value: modalSelector });
  }, []);



  if (!ingridients) return <AppHeader />;
  return (
    <>
      <div className={appStyle.body}>
        <AppHeader />
        <main className={appStyle.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />

            <BurgerConstuctor />
          </DndProvider>
        </main>
      </div>
    </>
  );
}

export default App;
