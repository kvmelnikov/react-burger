import React from "react";
import appStyle from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.jsx";
import BurgerConstuctor from "../burger-constructor/burger-constructor.jsx";
import Api from "../../utils/api/api.js";
import {useDispatch, useSelector} from 'react-redux';
import {SET_MODAL_SELECTOR} from '../../services/actions/index'
import { getIngredients } from "../../services/actions";


const modalSelector = document.querySelector("#modals");
const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/",
});

function App() {

  React.useEffect(()=>{
    dispatch(
    getIngredients())},[])
    
    React.useEffect(()=> {
      dispatch({type: SET_MODAL_SELECTOR, value: modalSelector})
    }, [])
  

  const dispatch = useDispatch();
  const ingridients = useSelector((state)=> state.burger.ingridients)





  if (!ingridients) return <AppHeader />;
  return (
    <>
      <div className={appStyle.body}>
        <AppHeader />
        <main className={appStyle.container}>
  
            <BurgerIngridients />
  
            <BurgerConstuctor />
        </main>
      </div>
    </>
  );
}

export default App;
