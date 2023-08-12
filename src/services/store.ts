import { ActionCreatorWithPayload, AnyAction, configureStore } from '@reduxjs/toolkit'
import { constructorApiMiddleware } from './middleware/constructor-api-middleware'
import constructorApiReducer, {constructorApiSliceActions, getIngredients, getIngredientsFailed, getIngredientsRequest, getIngredientsSuccess, orderRequest, orderRequestFailed, orderRequestSuccess } from './constructor/constructor-api-slice'
import formsSlice from './forms/forms-slice'


const constructorMiddleware = constructorApiMiddleware ({
  getIngredients: getIngredients,
  getIngredientsRequest: getIngredientsRequest,
  getIngredientsFailed: getIngredientsFailed,
  getIngredientsSuccess: getIngredientsSuccess,
  orderRequest: orderRequest,
  orderRequestFailed: orderRequestFailed,
  orderRequestSuccess: orderRequestSuccess,
}
) 

export const store = configureStore({
  reducer: {
      constructorApi: constructorApiReducer,
      form: formsSlice,
    // feed: feedReducer,
    // feedApi: feedApiReducer,
    // orders: orderReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(constructorMiddleware)
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store
