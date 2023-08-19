import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IIngredientDetails } from '../../types/types'
import { act } from 'react-dom/test-utils'
import { stat } from 'fs'

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
      state.showModalOrderDetails = true
      return state
    },
  },
})

export const { closeModal, showModalIngredientsDetail } = modalSlice.actions
export default modalSlice.reducer
