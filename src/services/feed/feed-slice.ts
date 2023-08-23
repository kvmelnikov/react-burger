import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { WebsocketStatus } from '../../types/websocket'
import { IIngredientsFeedDetail, addStatus, modificateOrder } from './feed-utils'
import { PayloadAction } from '@reduxjs/toolkit'
import { Bundle } from 'typescript'
import { RootState } from '../store'
import { stat } from 'fs'
import { act } from 'react-dom/test-utils'

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

// [
//   {
//       "_id": "64e5b37c82e277001bfaa843",
//       "ingredients": [
//           "643d69a5c3f7b9001cfa093d",
//           "643d69a5c3f7b9001cfa0943",
//           "643d69a5c3f7b9001cfa0942",
//           "643d69a5c3f7b9001cfa0943",
//           "643d69a5c3f7b9001cfa093d"
//       ],
//       "owner": "6493d2578a4b62001c85fb6b",
//       "status": "done",
//       "name": "Space флюоресцентный spicy бургер",
//       "createdAt": "2023-08-23T07:21:32.619Z",
//       "updatedAt": "2023-08-23T07:21:32.858Z",
//       "number": 17385,
//       "__v": 0
//   }
// ]

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

    const response = await fetch(`https://norma.nomoreparties.space/api/orders/${orderNumber}`, {
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
