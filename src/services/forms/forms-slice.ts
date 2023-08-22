import { PayloadAction, createSlice, isAction } from '@reduxjs/toolkit'
import { IFormsState } from '../../types/types-forms-slice'
import { getUserRequest, loginUserRequest, logoutUserRequest, registrationUser } from './forms-thunks'
import { stat } from 'fs'

export const initialState: IFormsState = {
  logoutUser: {
    request: false,
    failed: false,
    success: false,
  },
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
    setFormValueProfile: (state, action: PayloadAction<IFormDict>) => {
      type ObjectKey = keyof typeof state.formLogin.inputs
      const field = action.payload.field as ObjectKey
      if (state.formProfile.inputs[field]) {
        state.formProfile.inputs[field].value = action.payload.value
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserRequest.pending, (state) => {
        state.formProfile.request = true
      })
      .addCase(getUserRequest.fulfilled, (state, action) => {
        state.formProfile.request = false
        state.formProfile.failed = false
        state.formProfile.inputs.email.value = action.payload.email
        state.formProfile.inputs.name.value = action.payload.name
      })
      .addCase(getUserRequest.rejected, (state, action) => {
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
      .addCase(loginUserRequest.pending, (state, action) => {
        state.formLogin.request = true
      })
      .addCase(loginUserRequest.fulfilled, (state, action) => {
        state.formLogin.request = false
        state.formLogin.failed = false
        state.formProfile.inputs.email.value = action.payload.email
        state.formProfile.inputs.name.value = action.payload.name
      })
      .addCase(loginUserRequest.rejected, (state, action) => {
        state.formLogin.failed = true
        state.formLogin.request = false
      })
      .addCase(logoutUserRequest.pending, (state, action) => {
        state.logoutUser.request = true
      })
      .addCase(logoutUserRequest.fulfilled, (state, action) => {
        state.formProfile.inputs.email.value = ''
        state.formProfile.inputs.name.value = ''
        localStorage.setItem('accessToken', '')
        localStorage.setItem('refreshToken', '')
        state.logoutUser.failed = false
        state.logoutUser.success = true
        state.logoutUser.request = false
      })
      .addCase(logoutUserRequest.rejected, (state, action) => {
        state.logoutUser.request = false
        state.logoutUser.success = false
        state.logoutUser.failed = true
      })
  },
})

export const { setFormValueRegister, setFormValueLogin, setFormValueProfile } = formsSlice.actions
export default formsSlice.reducer
