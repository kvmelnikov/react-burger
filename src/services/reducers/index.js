
import { combineReducers } from "redux"; 
import { burgerReducer } from "./burger-reducer";



export const rootReducer = combineReducers({
    burger: burgerReducer,  
})