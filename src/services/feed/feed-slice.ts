import { createSlice } from '@reduxjs/toolkit'
import { WebsocketStatus } from '../../types/websocket'
import { addStatus } from './feed-utils'
import { PayloadAction } from '@reduxjs/toolkit'
import { Bundle } from 'typescript'

export interface IOrrder {
  _id: string
  ingredients: string[]
  status: string
  name: string
  createdAt: Date
  updatedAt: Date
  number: number
}

interface IResponseWs {
  orders: IOrrder[]
  succcess: boolean
  total: number
  totalToday: number
}

interface IStatusList {
  done?: number[]
  pending?: number[]
}

interface IinitialState {
  status: WebsocketStatus
  feeds: IOrrder[]
  connectingError: string
  statusOrders: IStatusList
  totalToday: number
  total: number
}

const initialState: IinitialState = {
  status: WebsocketStatus.OFFLINE,
  feeds: [],
  connectingError: '',
  statusOrders: {},
  totalToday: 0,
  total: 0,
}

const feedSlice = createSlice({
  name: 'feed',
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
      state.connectingError = ''
    },
    wsClose(state) {
      state.status = WebsocketStatus.OFFLINE
    },
    wssError(state, action) {
      state.connectingError = action.payload
    },
    wssMessage(state, action: PayloadAction<IResponseWs>) {
      state.totalToday = action.payload.totalToday
      state.total = action.payload.total
      state.feeds = action.payload.orders
    },
    addStatusOrders(state, action: PayloadAction<IOrrder[]>) {
      state.statusOrders = addStatus(action.payload)
    },
  },
})

export const { addStatusOrders, wsConnecting, wsConnect, wsOpen, wsClose, wssError, wssMessage, wsDisconnect } =
  feedSlice.actions
export default feedSlice.reducer
