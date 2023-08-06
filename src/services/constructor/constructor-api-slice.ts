import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { stat } from "fs"

interface IInitialState {
    ingredients_request: boolean
    ingredients_sucess:boolean
    ingredients_failed: boolean
    order_request: boolean
    order_success:boolean
    order_failed: boolean 
}


const initialState : IInitialState = {
    ingredients_request: false,
    ingredients_sucess: false,
    ingredients_failed: false,
    order_request: false,
    order_success:false,
    order_failed: false 
}

const constructorApiSlice = createSlice({
    name: 'constructorApi',
    initialState,
    reducers: {
        getIngredients: (state, action: PayloadAction<string>) => {
            return state
        },
        getIngredientsRequest: (state) => {
            state.ingredients_request = true
            return state
        },
        getIngredientsFailed: (state) =>{
            state.ingredients_failed = true
            state.ingredients_request = false
            return state
        },
        getIngredientsSuccess: (state) => {
            state.ingredients_failed = false
            state.ingredients_request = false
            return state
        },
        orderRequest:(state) => {
            state.order_request = true
            return state
        },
        orderRequestFailed: (state) => {
            state.order_failed = true
            state.order_request = false
            return state
        },
        orderRequestSuccess: (state) => {
            state.order_success = true
            state.order_request = false
            return state
        }
    }
}) 

export const {
    getIngredients, getIngredientsFailed, getIngredientsRequest,
    getIngredientsSuccess, orderRequest, orderRequestFailed, orderRequestSuccess
 } = constructorApiSlice.actions
 export default constructorApiSlice.reducer