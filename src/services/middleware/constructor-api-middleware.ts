import Api from "../../utils/api/api"
import { Action, ActionCreatorWithPayload, ActionCreatorWithoutPayload, AnyAction, Middleware, ThunkMiddleware } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { IIngredientDetails } from "../../types/types"
import { BaseActionCreator } from "@reduxjs/toolkit/dist/createAction"
// import { constructorApiSliceActions } from "../constructor/constructor-api-slice"
import { Dispatch } from "react"

const api = new Api({
  baseUrl: 'https://norma.nomoreparties.space/api/',
})

type TConstructorApiMiddleware  = {
  getIngredients: ActionCreatorWithPayload<string>
  getIngredientsRequest: ActionCreatorWithoutPayload
  getIngredientsFailed: ActionCreatorWithoutPayload
  getIngredientsSuccess: ActionCreatorWithoutPayload
  orderRequest: ActionCreatorWithoutPayload
  orderRequestFailed: ActionCreatorWithoutPayload
  orderRequestSuccess: ActionCreatorWithoutPayload
}


export const constructorApiMiddleware: any = (apiActions: TConstructorApiMiddleware): Middleware<{}, RootState> => {
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
        if (getIngredients.type === type)  {
            dispatch(getIngredientsRequest())
            api.getIngredients()
            .then((data) => {
              data.data.map((el: IIngredientDetails)=>{
                return (el.count = 0)
              })
              
              dispatch(getIngredientsSuccess(data.data))
            }).catch(() =>{
              dispatch(getIngredientsFailed())
            })
          
        }
        next(action)
      }
  
    }}
  