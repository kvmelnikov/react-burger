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
    deacreaseCounterIngredient: (state, action: PayloadAction<string>) => {
      let modificedIngredients = [...state.ingredients]
      state.ingredients = modificedIngredients.map((ingredient) => {
        return ingredient._id === action.payload && ingredient.count > 0
          ? { ...ingredient, count: --ingredient.count }
          : ingredient
      })
      return state
    },
    increaseCounterIngerident: (state, action: PayloadAction<string>) => {
      let modificedIngredients = [...state.ingredients]
      state.ingredients = modificedIngredients.map((ingredient) => {
        return ingredient._id === action.payload ? { ...ingredient, count: ++ingredient.count } : ingredient
      })
      return state
    },
    clearCountIngredients: (state, action: PayloadAction<string>) => {
      const modificedIngredients = [...state.ingredients]
      state.ingredients = modificedIngredients.map((ingredient) => {
        ingredient.count = 0
        return ingredient
      })

      return state
    },
  },
})

export const {
  setIngredients,
  increaseCounterIngerident,
  setCurrentIngredient,
  deacreaseCounterIngredient,
  clearCountIngredients,
} = IngredientSlice.actions
export default IngredientSlice.reducer
