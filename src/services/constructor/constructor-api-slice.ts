import { AnyAction, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { stat } from "fs"
import { IIngredientDetails } from "../../types/types"
import Ingridient from "../../components/ingridient/ingridient"

interface IInitialState {
    ingredients: IIngredientDetails[]
    ingredients_request: boolean
    ingredients_sucess:boolean
    ingredients_failed: boolean
    order_request: boolean
    order_success:boolean
    order_failed: boolean 
}


const initialState : IInitialState = {
    ingredients: [],
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
        getIngredients: (state) => {
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
        getIngredientsSuccess: (state, action: PayloadAction<IIngredientDetails[]>) => {
            state.ingredients_failed = false
            state.ingredients_request = false
            state.ingredients = action.payload
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

 export type constructorApiSliceActions =
 | ReturnType<typeof constructorApiSlice.actions.getIngredients> 
 | ReturnType<typeof constructorApiSlice.actions.getIngredientsRequest> 
 | ReturnType<typeof constructorApiSlice.actions.getIngredientsFailed> 
 | ReturnType<typeof constructorApiSlice.actions.getIngredientsSuccess>
 | ReturnType<typeof constructorApiSlice.actions.orderRequest>
 | ReturnType<typeof constructorApiSlice.actions.orderRequestFailed>
 | ReturnType<typeof constructorApiSlice.actions.orderRequestSuccess>


 export default constructorApiSlice.reducer