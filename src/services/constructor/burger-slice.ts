import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IIngredientDetails } from '../../types/types'
import { RootState } from '../store'
import { v4 as uuidv4 } from 'uuid'
import { stat } from 'fs'
import { showModalOrderDetails } from '../modal/modal-slice'
import { constants } from 'buffer'

export interface ITopping extends IIngredientDetails {
  index: number
  uuid: string
}

interface IingridientsForConstructor {
  bun?: ITopping
  toppings: ITopping[]
}

interface IBurgerState {
  numberOrder: number
  request: boolean
  failed: boolean
  success: boolean
  ingridientsForConstructor: IingridientsForConstructor
}

interface IinsertPayload {
  dragIndex: number
  hoverIndex: number
}

const makeCheckout = (consrtuctorIngridients: IingridientsForConstructor) => {
  const idToppings = consrtuctorIngridients.toppings.map((el) => {
    return el._id
  })
  if (consrtuctorIngridients.bun) {
    idToppings.push(consrtuctorIngridients.bun._id)
  }

  return idToppings
}

export const requestOrder = createAsyncThunk<
  number,
  IingridientsForConstructor,
  { rejectValue: string; state: RootState }
>('constructorApi/getIngredients', async (ingredients, thunkAPI) => {
  const accessToken = localStorage.getItem('accessToken')
  const prepareIngredients = makeCheckout(ingredients)
  thunkAPI.dispatch(showModalOrderDetails())
  const response = await fetch(`https://norma.nomoreparties.space/api/orders?token=${accessToken?.split(' ')[1]}`, {
    method: 'POST',
    headers: {
      authorization: `${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: prepareIngredients,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return thunkAPI.rejectWithValue('Server error')
      }
    })
    .catch((err) => thunkAPI.rejectWithValue('Server error'))
  console.log(response)
  return response.order.number
})

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
      return state
    },
    deleteIngredientInConstructor: (state, action: PayloadAction<number>) => {
      const newArray =
        state.ingridientsForConstructor.toppings.length === 1
          ? []
          : [
              ...state.ingridientsForConstructor.toppings.slice(0, action.payload),
              ...state.ingridientsForConstructor.toppings.slice(action.payload + 1),
            ]
      state.ingridientsForConstructor.toppings = newArray
      return state
    },
    addToppingToBurgerConstructor: (state, action: PayloadAction<ITopping>) => {
      //
      // const lengthCurrentToppings = state.ingridientsForConstructor.toppings.length
      // if (lengthCurrentToppings > 0) {
      //   newTopping.index = lengthCurrentToppings + 1
      // } else {
      //   newTopping.index = 0
      // }
      const newTopping = { ...action.payload }
      // newTopping.uuid = uuidv4()
      state.ingridientsForConstructor.toppings.push(newTopping)
      return state
    },
    addBunToBurgerConstructor: (state, action: PayloadAction<ITopping>) => {
      state.ingridientsForConstructor.bun = action.payload
      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOrder.pending, (state) => {
        state.request = true
      })
      .addCase(requestOrder.fulfilled, (state, action) => {
        state.request = false
        state.failed = false
        state.numberOrder = action.payload
      })
      .addCase(requestOrder.rejected, (state) => {
        state.request = false
        state.failed = true
      })
  },
})

export const {
  deleteIngredientInConstructor,
  insertIngredientInConstructor,
  addToppingToBurgerConstructor,
  addBunToBurgerConstructor,
} = burgerSlice.actions

export default burgerSlice.reducer
