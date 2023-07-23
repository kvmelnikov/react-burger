import { configureStore } from '@reduxjs/toolkit'
//import { socketMiddleware } from './middleware/socket-middleware.js';
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
  getDetailRequest,
  getDetailRequestSuccess,
  getDetailRequestFailed,
  getDetailFeed,
  setFeedDetail,
  setFeedDetailStructure,
} from './feed/feed-api-slice'

import { websocketMiddleware } from './middleware/websocket-middleware'
import { burgerReducer } from './reducers/burger-reducer'
import { ingredientsReducer } from './reducers/ingredients-reducer'
import { modalReducer } from './reducers/modal-reducer'
import { apiReducer } from './reducers/api-reducer'
import { formReducer } from './reducers/form-reducer'
import feedReducer from './feed/feed-slice'
import feedApiReducer from './feed/feed-api-slice'
import { apiFeedsMiddleware } from './middleware/api-feeds-middleware'

const FeedMiddleware = websocketMiddleware({
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage,
})

const FeedApiMiddleware = apiFeedsMiddleware({
  getDetailFeed: getDetailFeed,
  setFeedDetailStructure: setFeedDetailStructure,
  setFeedDetail: setFeedDetail,
  getDetailRequestSuccess: getDetailRequestSuccess,
  getDetailRequest: getDetailRequest,
  getDetailRequestFailed: getDetailRequestFailed,
})

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    ingredients: ingredientsReducer,
    modal: modalReducer,
    api: apiReducer,
    form: formReducer,
    feed: feedReducer,
    feedApi: feedApiReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(FeedMiddleware).concat(FeedApiMiddleware)
  },
  devTools: process.env.NODE_ENV !== 'production',
})
