export default {}
// import { ActionCreatorWithPayload, configureStore } from '@reduxjs/toolkit'
// // //import { socketMiddleware } from './middleware/socket-middleware.js';
// // import {
// //   wsConnect as FeedWsConnect,
// //   wsConnecting as FeedWsConnecting,
// //   wsClose as FeedWsClose,
// //   wssError as FeedWsError,
// //   wssMessage as FeedWsMessage,
// //   wsDisconnect as FeedWsDisconnect,
// //   wsOpen as FeedWsOpen,
// // } from './feed/feed-slice'

// // import {
// //   getDetailRequest,
// //   getDetailRequestSuccess,
// //   getDetailRequestFailed,
// //   getDetailFeed,
// //   setFeedDetail,
// //   setFeedDetailStructure,
// // } from './feed/feed-api-slice'

// // 
// // import {
// //   wsConnecting as OrderWsConnecting,
// //   wsConnect as OrderWsConnect,
// //   wsOpen as OrderWsOpen,
// //   wsClose as OrderWsClose,
// //   wssError as OrderWsError,
// //   wssMessage as OrderWsMessage,
// //   wsDisconnect as OrderWsDisconnect,
// // } from './order/order-slice'



// // import { websocketMiddleware } from './middleware/websocket-middleware'
// // import { burgerReducer } from './reducers/burger-reducer'
// // // import { ingredientsReducer } from './reducers/ingredients-reducer'
// // import { modalReducer } from './reducers/modal-reducer'
// // import { apiReducer } from './reducers/api-reducer'
// // import { formReducer } from './reducers/form-reducer'
// // import feedReducer from './feed/feed-slice'
// // import orderReducer from './order/order-slice'
// // import feedApiReducer from './feed/feed-api-slice'
// // import { apiFeedsMiddleware } from './middleware/api-feeds-middleware'
// // import { get } from 'https'
// import { constructorApiMiddleware } from './middleware/constructor-api-middleware'
// import constructorApiReducer, {getIngredients, getIngredientsFailed, getIngredientsRequest, getIngredientsSuccess, orderRequest, orderRequestFailed, orderRequestSuccess } from './constructor/constructor-api-slice'
// const constructorMiddleware = constructorApiMiddleware (
//   {
//     getIngredients: getIngredients,
//     getIngredientsRequest: getIngredientsRequest,
//     getIngredientsFailed: getIngredientsFailed,
//     getIngredientsSuccess: getIngredientsSuccess,
//     orderRequest: orderRequest,
//     orderRequestFailed: orderRequestFailed,
//     orderRequestSuccess: orderRequestSuccess, }
// ) 

// // const FeedMiddleware = websocketMiddleware({
// //   wsConnect: FeedWsConnect,
// //   wsDisconnect: FeedWsDisconnect,
// //   wsConnecting: FeedWsConnecting,
// //   onOpen: FeedWsOpen,
// //   onClose: FeedWsClose,
// //   onError: FeedWsError,
// //   onMessage: FeedWsMessage,
// // })

// // const FeedApiMiddleware = apiFeedsMiddleware({
// //   getDetailFeed: getDetailFeed,
// //   setFeedDetailStructure: setFeedDetailStructure,
// //   setFeedDetail: setFeedDetail,
// //   getDetailRequestSuccess: getDetailRequestSuccess,
// //   getDetailRequest: getDetailRequest,
// //   getDetailRequestFailed: getDetailRequestFailed,
// // })

// // const OrderMiddleware = websocketMiddleware({
// //   wsConnect: OrderWsConnect,
// //   wsDisconnect: OrderWsDisconnect,
// //   wsConnecting: OrderWsConnecting,
// //   onOpen: OrderWsOpen,
// //   onClose: OrderWsClose,
// //   onError: OrderWsError,
// //   onMessage: OrderWsMessage,
// // })

// export const store = configureStore({
//   reducer: {
//       constructorApi: constructorApiReducer
//     // burger: burgerReducer,
//    // ingredients: ingredientsReducer,
//     // modal: modalReducer,
//     // api: apiReducer,
//     // form: formReducer,
//     // feed: feedReducer,
//     // feedApi: feedApiReducer,
//     // orders: orderReducer,
//   },
//   middleware: (getDefaultMiddleware) => {
//     // return getDefaultMiddleware().concat(FeedMiddleware, FeedApiMiddleware, OrderMiddleware)
//     return getDefaultMiddleware().concat()
//   },
//   devTools: process.env.NODE_ENV !== 'production',
// })

// export type RootState = ReturnType<typeof store.getState>

// export default store
