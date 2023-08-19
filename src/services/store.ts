import { ActionCreatorWithPayload, AnyAction, configureStore } from '@reduxjs/toolkit'
import { constructorApiMiddleware } from './middleware/constructor-api-middleware'
import constructorApiReducer from './constructor/constructor-api-slice'
import formsSlice from './forms/forms-slice'
import IngredientReducer from './constructor/ingredient-slice'
import ModalReducer from './modal/modal-slice'
import BurgerReducer from './constructor/burger-slice'
import { Dispatch } from 'react'

// const constructorMiddleware = constructorApiMiddleware ({
//   getIngredients: getIngredients,
//   getIngredientsRequest: getIngredientsRequest,
//   getIngredientsFailed: getIngredientsFailed,
//   getIngredientsSuccess: getIngredientsSuccess,
//   orderRequest: orderRequest,
//   orderRequestFailed: orderRequestFailed,
//   orderRequestSuccess: orderRequestSuccess,
// }
// )

export const store = configureStore({
  reducer: {
    constructorApi: constructorApiReducer,
    form: formsSlice,
    ingredients: IngredientReducer,
    modal: ModalReducer,
    burger: BurgerReducer,
    // feed: feedReducer,
    // feedApi: feedApiReducer,
    // orders: orderReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat()
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
