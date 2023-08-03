import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  id: 0,
  feedDetail: {},
  feedDetailRequest: false,
  feeDetailFailed: false,
  feedDetailStrucure: [],
}

const FeedApiSlice = createSlice({
  name: 'feedApi',
  initialState,
  reducers: {
    getDetailFeed(state, action) {
      state.id = action.payload
    },
    getDetailRequest(state) {
      state.getDetailRequest = true
    },
    getDetailRequestSuccess(state) {
      state.feedDetailRequest = false
      state.feeDetailFailed = false
    },
    setFeedDetail(state, action) {
      state.feedDetail = action.payload
    },
    setFeedDetailStructure(state, action) {
      state.feedDetailStrucure = action.payload
    },
    getDetailRequestFailed(state, action) {
      state.feeDetailFailed = true
    },
  },
})

export const {
  getDetailFeed,
  setFeedDetail,
  setFeedDetailStructure,
  getDetailRequest,
  getDetailRequestSuccess,
  getDetailRequestFailed,
} = FeedApiSlice.actions

export default FeedApiSlice.reducer
