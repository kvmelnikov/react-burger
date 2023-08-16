import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IIngredientDetails } from '../../types/types'
import { act } from 'react-dom/test-utils'
import { stat } from 'fs'

interface IIndgredientState {
  ingredients: IIngredientDetails[]
  currentIngridient?: IIngredientDetails
  images: string[]
}

const initialState: IIndgredientState = {
  ingredients: [],
  currentIngridient: undefined,
  images: [],
}

const IngredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<IIngredientDetails[]>) => {
      state.ingredients = action.payload
      return state
    },

    setCurrentIngredient: (state, action: PayloadAction<string>) => {
      state.currentIngridient = state.ingredients.filter((el) => el._id === action.payload)[0]
      return state
    },
  },
})

export const { setIngredients, setCurrentIngredient } = IngredientSlice.actions
export default IngredientSlice.reducer
