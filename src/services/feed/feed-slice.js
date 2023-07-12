import { createSlice } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/live-table';
import { wsError, wsMessage } from '../live-table/actions';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  feeds: [],
  connectingError: '',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnecting(state) {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsConnect(state) {
      state.status = WebsocketStatus.CONNECT;
    },
    wsDisconnect(state) {
      state.status = WebsocketStatus.DISCONNECT;
    },
    wsOpen(state) {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = '';
    },
    wsClose(state) {
      state.status = WebsocketStatus.OFFLINE;
    },
    wssError(state, action) {
      state.connectingError = action.payload;
    },
    wssMessage(state, action) {
      state.feeds = action.payload;
    },
  },
});

export const {
  wsConnecting,
  wsConnect,
  wsOpen,
  wsClose,
  wssError,
  wssMessage,
  wsDisconnect,
} = feedSlice.actions;
export default feedSlice.reducer;
