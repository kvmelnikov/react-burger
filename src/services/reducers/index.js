
import { combineReducers } from "redux"; 
import {  burgerReducer } from "./burger-reducer";
import  {ingredientsReducer}  from "./ingredients-reducer";
import { modalReducer } from "./modal-reducer";
import {apiReducer } from './api-reducer';

export const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,  
    ingridients: [],
    ingridients2: [],
  
    orderRequest: false,
    orderRequestFailed: false,
    numberOrder: 0,
  
    ingridientsForConstructor: {
      bun: {},
      toppings: [],
    },
    currentIngridient: {},
    order: {},
    modalIngridientDetail: false,
    showModalOrderDetails: false,
    modalSelector: {}
  };


export const rootReducer = combineReducers({
    burger: burgerReducer,
    ingredients: ingredientsReducer, 
    modal: modalReducer,
    api: apiReducer
})