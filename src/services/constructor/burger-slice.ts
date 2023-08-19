import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IIngredientDetails } from '../../types/types'
import { RootState } from '../store'
import { stat } from 'fs'

interface IBurgerState {
  numberOrder: number
  request: boolean
  failed: boolean
  success: boolean
  ingridientsForConstructor: {
    bun?: IIngredientDetails
    toppings: IIngredientDetails[]
  }
}

interface IinsertPayload {
  dragIndex: number
  hoverIndex: number
}

// const makeCheckout = (consrtuctorIngridients) => {
//   const idToppings = consrtuctorIngridients.toppings.map((el) => {
//     return el._id
//   })
//   idToppings.push(consrtuctorIngridients.bun._id)
//   return idToppings
// }

export const requestOrder = createAsyncThunk<number, void, { rejectValue: string; state: RootState }>(
  'constructorApi/getIngredients',
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem('accessToken')
    const response = await fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        authorization: `${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res)
    })

    return 1
  },
)

const initialState: IBurgerState = {
  request: false,
  failed: false,
  success: false,
  numberOrder: 0,
  ingridientsForConstructor: {
    bun: undefined,
    toppings: [],
  },
}

const burgerSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    insertIngredientInConstructor: (state, action: PayloadAction<IinsertPayload>) => {
      const newArray = [...state.ingridientsForConstructor.toppings]
      newArray.splice(action.payload.dragIndex, 0, newArray.splice(action.payload.hoverIndex, 1)[0])
      state.ingridientsForConstructor.toppings = newArray
    },
    addToppingToBurgerConstructor: (state, action: PayloadAction<IIngredientDetails>) => {
      state.ingridientsForConstructor.toppings.push(action.payload)
    },
    addBunToBurgerConstructor: (state, action: PayloadAction<IIngredientDetails>) => {
      state.ingridientsForConstructor.bun = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOrder.pending, (state) => {
        state.request = true
      })
      .addCase(requestOrder.fulfilled, (state) => {
        state.request = false
        state.failed = false
      })
      .addCase(requestOrder.rejected, (state) => {
        state.request = false
        state.failed = true
      })
  },
})

export const { insertIngredientInConstructor, addToppingToBurgerConstructor, addBunToBurgerConstructor } =
  burgerSlice.actions

export default burgerSlice.reducer
