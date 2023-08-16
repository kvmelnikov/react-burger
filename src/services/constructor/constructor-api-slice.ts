import { AnyAction, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IIngredientDetails } from '../../types/types'
import { RootState } from '../store'
import { setCurrentIngredient, setIngredients } from './ingredient-slice'

export const getIngredients = createAsyncThunk<
  IIngredientDetails[],
  string | undefined,
  { rejectValue: string; state: RootState }
>('constructorApi/getIngredients', async (id, thunkAPI) => {
  console.log('get ingredients')
  const response = await fetch('https://norma.nomoreparties.space/api/ingredients', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res)
      if (res.ok) {
        if (id) {
          thunkAPI.dispatch(setCurrentIngredient(id))
        }
        return res.json()
      } else {
        return thunkAPI.rejectWithValue('Server error')
      }
    })
    .then((res) => {
      thunkAPI.dispatch(setIngredients(res.data))
      if (id) {
        thunkAPI.dispatch(setCurrentIngredient(id))
      }
      return res
    })

  return response.data
})

interface IInitialState {
  ingredients: IIngredientDetails[]
  ingredients_request: boolean
  ingredients_sucess: boolean
  ingredients_failed: boolean
  order_request: boolean
  order_success: boolean
  order_failed: boolean
}

const initialState: IInitialState = {
  ingredients: [],
  ingredients_request: false,
  ingredients_sucess: false,
  ingredients_failed: false,
  order_request: false,
  order_success: false,
  order_failed: false,
}

const constructorApiSlice = createSlice({
  name: 'constructorApi',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredients_request = true
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients_request = false
        state.ingredients_sucess = true
        state.ingredients_failed = false
        console.log(action.payload)
        state.ingredients = action.payload
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredients_request = false
        state.ingredients_sucess = false
        state.ingredients_failed = true
      })
  },
})

export default constructorApiSlice.reducer
