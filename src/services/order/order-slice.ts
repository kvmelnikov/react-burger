import { createSlice } from '@reduxjs/toolkit'
import { WebsocketStatus } from '../../types/websocket'
import { PayloadAction } from '@reduxjs/toolkit'
import { IResponseWs } from '../feed/feed-slice'

export interface IOrrder {
  _id: string
  ingredients: string[]
  status: string
  name: string
  createdAt: Date
  updatedAt: Date
  number: number
}

export type orderSliceType = {
  status: WebsocketStatus
  connectionError: string
  orders: IOrrder[]
}

const initialState: orderSliceType = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: '',
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    wsConnecting(state) {
      state.status = WebsocketStatus.CONNECTING
    },
    wsConnect(state, action) {
      state.status = WebsocketStatus.CONNECT
    },
    wsDisconnect(state) {
      state.status = WebsocketStatus.DISCONNECT
    },
    wsOpen(state) {
      state.status = WebsocketStatus.ONLINE
      state.connectionError = ''
    },
    wsClose(state) {
      state.status = WebsocketStatus.OFFLINE
    },
    wssError(state, action) {
      state.connectionError = action.payload
    },
    wssMessage(state, action: PayloadAction<IResponseWs>) {
      state.orders = action.payload.orders
    },
  },
})

export const { wsConnecting, wsConnect, wsOpen, wsClose, wssError, wssMessage, wsDisconnect } = orderSlice.actions
export default orderSlice.reducer
