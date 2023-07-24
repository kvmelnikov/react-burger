import { createSlice } from '@reduxjs/toolkit'
import { WebsocketStatus } from '../../utils/websocket'

const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: '',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    wsConnecting(state) {
      state.status = WebsocketStatus.CONNECTING
    },
    wsConnect(state) {
      state.status = WebsocketStatus.CONNECT
    },
    wsDisconnect(state) {
      state.status = WebsocketStatus.DISCONNECT
    },
    wsOpen(state) {
      state.status = WebsocketStatus.ONLINE
      state.connectingError = ''
    },
    wsClose(state) {
      state.status = WebsocketStatus.OFFLINE
    },
    wssError(state, action) {
      state.connectingError = action.payload
    },
    wssMessage(state, action) {
      console.log(action.payload)
      state.orders = action.payload.orders
    },
  },
})

export const { wsConnecting, wsConnect, wsOpen, wsClose, wssError, wssMessage, wsDisconnect } = orderSlice.actions
export default orderSlice.reducer
