
import { combineReducers } from "redux"; 
import { burgerReducer, modalReducer, apiReducer, ingredientsReducer, constructorReducer } from "./burger-reducer";



export const rootReducer = combineReducers({
    burger: burgerReducer,
    ingredientsR: ingredientsReducer, 
    // constructor: constructorReducer,
    modal: modalReducer,
    api: apiReducer
})