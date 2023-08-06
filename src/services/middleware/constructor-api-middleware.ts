import Api from "../../utils/api/api"
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IIngridientDetails } from "../../types/types"

const api = new Api({
  baseUrl: 'https://norma.nomoreparties.space/api/',
})

export interface IConstructorApiMiddleware  {
  getIngredients: ActionCreatorWithPayload<string>
  getIngredientsRequest: ActionCreatorWithoutPayload
  getIngredientsFailed: ActionCreatorWithoutPayload
  getIngredientsSuccess: ActionCreatorWithoutPayload
  orderRequest: ActionCreatorWithoutPayload
  orderRequestFailed: ActionCreatorWithoutPayload
  orderRequestSuccess: ActionCreatorWithoutPayload
}



  export const constructorApiMiddleware = (apiActions: IConstructorApiMiddleware): Middleware<{}, RootState> => {
    return (store) => {
      return next => action => {
        const { dispatch, getState } = store
        const { type } = action
        const {
            getIngredients,
            getIngredientsRequest,
            getIngredientsFailed,
            getIngredientsSuccess,
            orderRequest,
            orderRequestFailed,
            orderRequestSuccess,
        } = apiActions
        if (getIngredients.type === type) {
            dispatch(getIngredientsRequest())
            api.getIngredients()
            .then((data) => {
              data.data.map((el: IIngridientDetails)=>{
                return (el.count = 0)
              })
              dispatch(getIngredientsSuccess())
            }).catch(() =>{
              dispatch(getIngredientsFailed())
            })
          
        }
        next(action)
      }
  
    }}
  