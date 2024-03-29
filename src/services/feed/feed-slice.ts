import { compose, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { WebsocketStatus } from '../../types/websocket'
import { IIngredientsFeedDetail, addStatus, modificateOrder } from './feed-utils'
import { PayloadAction } from '@reduxjs/toolkit'
import { Bundle } from 'typescript'
import { RootState } from '../store'
import { stat } from 'fs'
import { act } from 'react-dom/test-utils'
import { base_url } from '../../app'

export interface IOrrder {
  _id: string
  ingredients: string[]
  status: string
  name: string
  createdAt: Date
  updatedAt: Date
  number: number
}

export interface IResponseWs {
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
  requestDetail: boolean
  failedDetail: boolean
  succcessDetail: boolean
  feedDetail?: IOrrder
  feedDetailStrucure?: IIngredientsFeedDetail[]
  sumIngredients: number
}

interface IGetDetailData {
  feeds: IOrrder[]
  id: string
}

interface IResp {
  order: IOrrder
  ingredients: IIngredientsFeedDetail[]
  sumIngredients: number
}

export const getDetaiFeedlRequest = createAsyncThunk<IResp, IGetDetailData, { rejectValue: string; state: RootState }>(
  'feed/getDetaiFeedlRequest',
  async (data, thunkAPI) => {
    const elementFeeds = data.feeds.filter((el) => data.id === el._id)
    const orderNumber = elementFeeds[0].number
    const response = await fetch(`${base_url}orders/${orderNumber}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return thunkAPI.rejectWithValue('Server error')
      })
      .then((res) => {
        const resModificate = modificateOrder(thunkAPI.getState().ingredients.ingredients, res.orders[0].ingredients)
        return {
          order: res.orders[0],
          ingredients: resModificate.ingredients,
          sumIngredients: resModificate.sumIngredients,
        }
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue('Server error')
      })
    return response
  },
)

const initialState: IinitialState = {
  status: WebsocketStatus.OFFLINE,
  feeds: [],
  connectingError: '',
  statusOrders: {},
  totalToday: 0,
  total: 0,
  requestDetail: false,
  failedDetail: false,
  succcessDetail: false,
  feedDetail: undefined,
  feedDetailStrucure: undefined,
  sumIngredients: 0,
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
  extraReducers: (builder) => {
    builder
      .addCase(getDetaiFeedlRequest.pending, (state) => {
        state.requestDetail = true
      })
      .addCase(getDetaiFeedlRequest.fulfilled, (state, action) => {
        state.succcessDetail = true
        state.failedDetail = false
        state.requestDetail = false
        state.feedDetail = action.payload.order
        state.feedDetailStrucure = action.payload.ingredients
        state.sumIngredients = action.payload.sumIngredients
      })
  },
})

export const { addStatusOrders, wsConnecting, wsConnect, wsOpen, wsClose, wssError, wssMessage, wsDisconnect } =
  feedSlice.actions
export default feedSlice.reducer
