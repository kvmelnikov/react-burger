import { liveTableReducer } from './live-table/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket-middleware.js';
import {
  connect as LiveTableWsConnect,
  disconnect as LiveTableWsDisconnect,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsMessage,
  wsError as LiveTableWsError,
  wsConnecting as LiveTableWsConnecting,
} from './live-table/actions';

import { burgerReducer } from './reducers/burger-reducer';
import { ingredientsReducer } from './reducers/ingredients-reducer';
import { modalReducer } from './reducers/modal-reducer';
import { apiReducer } from './reducers/api-reducer';
import { formReducer } from './reducers/form-reducer';

const liveTableMiddleware = socketMiddleware({
  wsConnect: LiveTableWsConnect,
  wsDisconnect: LiveTableWsDisconnect,
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsMessage,
});

export const store = configureStore({
  reducer: {
    burger: burgerReducer,
    ingredients: ingredientsReducer,
    modal: modalReducer,
    api: apiReducer,
    form: formReducer,
    liveTable: liveTableReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveTableMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});
