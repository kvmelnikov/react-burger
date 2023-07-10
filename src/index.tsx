import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.jsx';
// import { reducer } from './services/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';
// import { configureStore } from '@reduxjs/toolkit';
// import { socketMiddleware } from './services/middleware/socket-middleware';
// import {
//   connect as LiveTableWsConnect,
//   disconnect as LiveTableWsDisconnect,
//   wsOpen as LiveTableWsOpen,
//   wsClose as LiveTableWsClose,
//   wsMessage as LiveTableWsMessage,
//   wsError as LiveTableWsError,
//   wsConnecting as LiveTableWsConnecting,
// } from './services/live-table/actions';

// const liveTableMiddleware = socketMiddleware({
//   wsConnect: LiveTableWsConnect,
//   wsDisconnect: LiveTableWsDisconnect,
//   wsConnecting: LiveTableWsConnecting,
//   onOpen: LiveTableWsOpen,
//   onClose: LiveTableWsClose,
//   onError: LiveTableWsError,
//   onMessage: LiveTableWsMessage,
// });

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(liveTableMiddleware);
//   },
//   devTools: process.env.NODE_ENV !== 'production',
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
