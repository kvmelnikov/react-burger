import { createSlice } from '@reduxjs/toolkit'

interface IModalState {
  modalIngridientDetail: boolean
  showModalOrderDetails: boolean
}

const initialState: IModalState = {
  modalIngridientDetail: false,
  showModalOrderDetails: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modalIngridientDetail = false
      state.showModalOrderDetails = false
      return state
    },
    showModalIngredientsDetail: (state) => {
      state.modalIngridientDetail = true
      return state
    },
    showModalOrderDetails: (state) => {
      state.showModalOrderDetails = true
    },
  },
})

export const { showModalOrderDetails, closeModal, showModalIngredientsDetail } = modalSlice.actions
export default modalSlice.reducer
