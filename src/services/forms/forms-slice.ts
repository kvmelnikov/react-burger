import { Draft, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'
import { Writable } from 'stream'
import { IFormsState, IInputsFormLogin, IInputsFormProfile, IInputsKeyAccess } from '../../types/types-forms-slice'
import { RootState } from '../store'
import thunk from 'redux-thunk'

type TUser = {
  name: string
}

type TRegister = {
  name: string
  email: string
}

interface IDictData {
  [key: string]: string
}

const createBodyFormRequest = (inputs: IInputsFormProfile | IInputsFormLogin) => {
  let data: IDictData = {}

  Object.keys(inputs).forEach((key) => {
    type ObjectKey = keyof typeof inputs
    const field = key as ObjectKey

    data[field] = inputs[field].value
  })
  return JSON.stringify(data)
}

export const LoginUserRequest = createAsyncThunk<TRegister, void, { rejectValue: string; state: RootState }>(
  'forms/LoginUserRequest',
  async (_, thunkAPI) => {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: createBodyFormRequest(thunkAPI.getState().form.formLogin.inputs),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (!res.success) {
          return thunkAPI.rejectWithValue(res.message)
        } else {
          localStorage.setItem('accessToken', res.accessToken)
          localStorage.setItem('refreshToken', res.refreshToken)
          return res
        }
      })

    return response.user
  },
)

export const registrationUser = createAsyncThunk<TRegister, void, { rejectValue: string; state: RootState }>(
  'forms/registrationUser',
  async (_, thunkAPI) => {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: createBodyFormRequest(thunkAPI.getState().form.formRegister.inputs),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.success) {
          return thunkAPI.rejectWithValue('Not registration')
        } else {
          localStorage.setItem('accessToken', res.accessToken)
          localStorage.setItem('refreshToken', res.refreshToken)
          return res
        }
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue('Server error')
      })

    return response
  },
)

export const getUserRequest = createAsyncThunk<TUser, undefined, { rejectValue: string }>(
  'forms/getUserRequest',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `${localStorage.getItem('accessToken')}`,
        },
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      console.log(response, 'responseresponse')
      return response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const initialState: IFormsState = {
  formProfile: {
    inputs: {
      email: { value: '' },
      name: { value: '' },
      password: { value: '' },
    },
    request: false,
    failed: false,
  },
  formForgotPassword: {
    inputs: {
      email: { value: '' },
    },
    request: false,
    failed: false,
    redirect: false,
  },
  formResetPassword: {
    inputs: {
      pass: { value: '' },
      token: { value: '' },
    },
    request: false,
    failed: false,
  },
  formRegister: {
    inputs: {
      email: { value: '' },
      password: { value: '' },
      name: { value: '' },
    },
    request: false,
    failed: false,
  },
  formLogin: {
    inputs: {
      email: { value: '' },
      password: { value: '' },
    },
    request: false,
    failed: false,
  },
  logout: {
    request: false,
    failed: false,
  },
}

interface IFormDict {
  field: string
  value: string
  form: string
}

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFormValueRegister: (state, action: PayloadAction<IFormDict>) => {
      type ObjectKey = keyof typeof state.formRegister.inputs
      const field = action.payload.field as ObjectKey
      if (state.formRegister.inputs[field]) {
        state.formRegister.inputs[field].value = action.payload.value
      }
    },
    setFormValueLogin: (state, action: PayloadAction<IFormDict>) => {
      type ObjectKey = keyof typeof state.formLogin.inputs
      const field = action.payload.field as ObjectKey
      if (state.formLogin.inputs[field]) {
        state.formLogin.inputs[field].value = action.payload.value
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserRequest.pending, (state) => {
        state.formProfile.request = true
      })
      .addCase(getUserRequest.fulfilled, (state, action) => {
        state.formProfile.inputs.name.value = action.payload.name
      })
      .addCase(getUserRequest.rejected, (state, action) => {
        console.log(action.payload)
        state.formProfile.failed = true
      })
      .addCase(registrationUser.pending, (state) => {
        state.formRegister.request = true
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.formRegister.request = false
        state.formRegister.failed = false
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.formRegister.request = false
        state.formRegister.failed = true
      })
      .addCase(LoginUserRequest.pending, (state, action) => {
        state.formLogin.request = true
      })
      .addCase(LoginUserRequest.fulfilled, (state, action) => {
        state.formLogin.request = false
        state.formLogin.failed = false
        state.formProfile.inputs.email.value = action.payload.email
        state.formProfile.inputs.name.value = action.payload.name
      })
  },
})

// getUserRequest: (state) => {
//   return state
// },
// setProfileForm: (state, action: PayloadAction<string>)=>{
//   state.formProfile.inputs.email.value= action.payload
//   state.formProfile.inputs.name.value= action.payload
//   state.formProfile.inputs.email.value= ""
//   return state
// },
// profileRequestSubmitSuccess: (state) => {
//   state.formProfile.request = false
//   state.formProfile.failed = false
//   return state
// }

// getIngredients: (state, action: PayloadAction<string>) => {
//     return state
// },
// getIngredientsRequest: (state) => {
//     state.ingredients_request = true
//     return state
// },

export const { setFormValueRegister, setFormValueLogin } = formsSlice.actions
export default formsSlice.reducer
