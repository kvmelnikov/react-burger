import { ActionCreatorWithPayload, AnyAction, configureStore } from '@reduxjs/toolkit'
import { constructorApiMiddleware } from './middleware/constructor-api-middleware'
import constructorApiReducer from './constructor/constructor-api-slice'
import formsSlice from './forms/forms-slice'
import IngredientReducer from './constructor/ingredient-slice'
import ModalReducer from './modal/modal-slice'
import BurgerReducer from './constructor/burger-slice'
import { Dispatch } from 'react'
import orderReducer from './order/order-slice'
import feedReducer from './feed/feed-slice'

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

import {
  wsConnect as FeedWsConnect,
  wsConnecting as FeedWsConnecting,
  wsClose as FeedWsClose,
  wssError as FeedWsError,
  wssMessage as FeedWsMessage,
  wsDisconnect as FeedWsDisconnect,
  wsOpen as FeedWsOpen,
} from './feed/feed-slice'

import {
  wsConnecting as OrderWsConnecting,
  wsConnect as OrderWsConnect,
  wsOpen as OrderWsOpen,
  wsClose as OrderWsClose,
  wssError as OrderWsError,
  wssMessage as OrderWsMessage,
  wsDisconnect as OrderWsDisconnect,
} from './order/order-slice'

import { websocketMiddleware } from './middleware/websocket-middleware'

const FeedMiddleware: any = websocketMiddleware({
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage,
})

const OrderMiddleware: any = websocketMiddleware({
  wsConnect: OrderWsConnect,
  wsDisconnect: OrderWsDisconnect,
  wsConnecting: OrderWsConnecting,
  onOpen: OrderWsOpen,
  onClose: OrderWsClose,
  onError: OrderWsError,
  onMessage: OrderWsMessage,
})

export const store = configureStore({
  reducer: {
    constructorApi: constructorApiReducer,
    form: formsSlice,
    ingredients: IngredientReducer,
    modal: ModalReducer,
    burger: BurgerReducer,
    feed: feedReducer,
    // feedApi: feedApiReducer,
    orders: orderReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(OrderMiddleware, FeedMiddleware)
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
