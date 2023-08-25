import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IInputsFormForgotPassword,
  IInputsFormLogin,
  IInputsFormProfile,
  IInputsResetPassword,
} from '../../types/types-forms-slice'
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

const createBodyFormRequest = (inputs: IInputsFormProfile | IInputsFormLogin | IInputsFormForgotPassword) => {
  let data: IDictData = {}

  Object.keys(inputs).forEach((key) => {
    type ObjectKey = keyof typeof inputs
    const field = key as ObjectKey

    data[field] = inputs[field].value
  })
  return JSON.stringify(data)
}

const createBodyFormRequestReset = (inputs: IInputsResetPassword) => {
  let data: IDictData = {}

  Object.keys(inputs).forEach((key) => {
    type ObjectKey = keyof typeof inputs
    const field = key as ObjectKey

    data[field] = inputs[field].value
  })
  return JSON.stringify(data)
}

export const resetPassRequest = createAsyncThunk<boolean, void, { rejectValue: string; state: RootState }>(
  'forms/resetPassRequest',
  async (_, thunkAPI) => {
    const response = await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: createBodyFormRequestReset(thunkAPI.getState().form.formResetPassword.inputs),
    })
      .then((res) => {
        if (res.ok) {
          return res.ok
        }
        return thunkAPI.rejectWithValue('Server error')
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue('Server error')
      })

    return response
  },
)

export const forgotPassRequest = createAsyncThunk<boolean, void, { rejectValue: string; state: RootState }>(
  'forms/forgotPassRequest',
  async (_, thunkAPI) => {
    const response = await fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: createBodyFormRequest(thunkAPI.getState().form.formForgotPassword.inputs),
    })
      .then((res) => {
        if (res.ok) {
          return res.ok
        }
        return thunkAPI.rejectWithValue('Server error')
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue('Server error')
      })

    return response
  },
)

export const logoutUserRequest = createAsyncThunk<number, void, { rejectValue: string }>(
  'forms/logoutUserRequest',
  async (_, thunkAPI) => {
    const response = await fetch('https://norma.nomoreparties.space/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: `${localStorage.getItem('refreshToken')}` }),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.success) {
          return res
        } else {
          return thunkAPI.rejectWithValue('Server error')
        }
      })
      .catch((err) => {
        return thunkAPI.rejectWithValue('Server error')
      })
    return 2
  },
)

export const loginUserRequest = createAsyncThunk<TRegister, void, { rejectValue: string; state: RootState }>(
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
      .catch((err) => {
        return thunkAPI.rejectWithValue('Server error')
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

const updateToken = async () => {
  return fetch('https://norma.nomoreparties.space/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.success) {
        localStorage.setItem('accessToken', res.accessToken)
        return res
      }
      return Promise.reject(`Ошибка: ${res}`)
    })
    .catch((err) => {
      return err
    })
}

interface Theaders {
  [key: string]: string
}

interface TBody {
  method: string
  headers: Theaders
}

const fetchWithRefresh = async (url: string, options: TBody) => {
  try {
    const response = await fetch(url, options)
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        Promise.reject(err)
      })

    if (response.success) {
      return response
    } else {
      throw new Error(response.message)
    }
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await updateToken()
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      localStorage.setItem('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const response = await fetch(url, options)
        .then((res) => {
          return res.json()
        })
        .catch((err) => {
          Promise.reject(err)
        })
      if (response.success) {
        return response
      } else {
        throw new Error(response.message)
      }
    } else {
      return Promise.reject(err)
    }
  }
}

export const getUserRequest = createAsyncThunk<TRegister, void, { rejectValue: string }>(
  'forms/getUserRequest',
  async function (_, thunkAPI) {
    const response = await fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
      headers: {
        authorization: `${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    return response.user
  },
)
