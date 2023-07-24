import { setCookie, getCookie } from '../../utils/cookie'
export const SET_VALUE_TO_FORM = 'SET_VALUE_TO_FORM'

export const FORGOT_PASS_FORM_SUBMIT = 'FORGOT_PASS_FORM_SUBMIT'
export const FORGOT_PASS_FORM_SUBMIT_SUCCESS = 'FORGOT_PASS_FORM_SUBMIT_SUCCESS'
export const FORGOT_PASS_FORM_SUBMIT_FAILED = 'FORGOT_PASS_FORM_SUBMIT_FAILED'
export const RESET_PASS_FORM_SUBMIT = 'RESET_PASS_FORM_SUBMIT'
export const RESET_PASS_FORM_SUBMIT_SUCCESS = 'RESET_PASS_FORM_SUBMIT_SUCCESS'
export const RESET_PASS_FORM_SUBMIT_FAILED = 'RESET_PASS_FORM_SUBMIT_FAILED'
export const AUTORIZATION_FORM_SUBMIT = 'AUTORIZATION_FORM_SUBMIT'
export const AUTORIZATION_FORM_SUBMIT_SUCCESS = 'AUTORIZATION_FORM_SUBMIT_SUCCESS'
export const AUTORIZATION_FORM_SUBMIT_FAILED = 'AUTORIZATION_FORM_SUBMIT_FAILED'
export const REGISTRATION_FORM_SUBMIT = 'REGISTRATION_FORM_SUBMIT'
export const REGISTRATION_FORM_SUBMIT_SUCCESS = 'REGISTRATION_FORM_SUBMIT_SUCCESS'
export const REGISTRATION_FORM_SUBMIT_FAILED = 'REGISTRATION_FORM_SUBMIT_FAILED'
export const LOGOUT_FORM_SUBMIT = 'LOGOUT_FORM_SUBMIT'
export const LOGOUT_FORM_SUBMIT_SUCCESS = 'LOGOUT_FORM_SUBMIT_SUCCESS'
export const LOGOUT_FORM_SUBMIT_FAILED = 'LOGOUT_FORM_SUBMIT_FAILED'
export const UPDATE_FORM_SUBMIT = 'UPDATE_FORM_SUBMIT'
export const UPDATE_FORM_SUBMIT_SUCCESS = 'UPDATE_FORM_SUBMIT_SUCCESS'
export const UPDATE_FORM_SUBMIT_FAILED = 'UPDATE_FORM_SUBMIT_FAILED'
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM_SUBMIT_SUCCESS'
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED'
export const GET_USER_FORM_SUBMIT = 'GET_USER_FORM_SUBMIT'
export const GET_USER_FORM_SUBMIT_SUCCESS = 'GET_USER_FORM_SUBMIT_SUCCESS'
export const GET_USER_FORM_SUBMIT_FAILED = 'GET_USER_FORM_SUBMIT_FAILED'
export const RESET_USER_FORM = 'RESET_USER_FORM'

export const setFormValue = ({ field, value, form }) => ({
  type: SET_VALUE_TO_FORM,
  field,
  value,
  form,
})

const createBodyFormRequest = (inputs) => {
  let data = {}

  Object.keys(inputs).forEach((key) => {
    data[key] = inputs[key].value
  })
  console.log(data)
  return JSON.stringify(data)
}

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}
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
        //getUserRequest();
        return res
      }
      return Promise.reject(`Ошибка: ${res}`)
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options)
    return await checkReponse(res)
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await updateToken()
      localStorage.setItem('refreshToken', refreshData.refreshToken)
      localStorage.setItem('accessToken', refreshData.accessToken)
      options.headers.authorization = refreshData.accessToken
      const res = await fetch(url, options)
      return await checkReponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}

const getUser = async () => {
  return await fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${localStorage.getItem('accessToken')}`,
    },
  }).then((res) => res.json())
}

export const getUserRequest = () => (dispatch) => {
  dispatch({
    type: GET_USER_FORM_SUBMIT,
  })
  const resFetch = fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${localStorage.getItem('accessToken')}`,
    },
  })
  resFetch
    .then((res) => {
      dispatch({
        type: GET_USER_FORM_SUBMIT_SUCCESS,
        value: res.user,
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_FORM_SUBMIT_FAILED,
      })
    })
}

export const updateUserRequest = () => (dispatch, getState) => {
  dispatch({
    type: GET_USER_FORM_SUBMIT,
  })
  fetch('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `${localStorage.getItem('accessToken')}`,
    },
    body: createBodyFormRequest(getState().form.formProfile.inputs),
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.message === 'jwt expired') {
        updateToken().then((res) => {
          getUser().then((res) => {
            if (res.success) {
              dispatch({
                type: GET_USER_FORM_SUBMIT_SUCCESS,
                value: res.user,
              })
              return res
            }
            return Promise.reject(`Ошибка: ${res.status}`)
          })
        })
      } else if (res.success) {
        dispatch({
          type: GET_USER_FORM_SUBMIT_SUCCESS,
          value: res.user,
        })
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: GET_USER_FORM_SUBMIT_FAILED,
      })
    })
}

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_FORM_SUBMIT,
  })
  fetch('https://norma.nomoreparties.space/api/auth/logout', {
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
        dispatch({
          type: LOGOUT_FORM_SUBMIT_SUCCESS,
        })
        dispatch({ type: RESET_USER_FORM })
        localStorage.setItem('accessToken', '')
        localStorage.setItem('refreshToken', '')
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FORM_SUBMIT_FAILED,
      })
    })
}

export const loginUser = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN_FORM_SUBMIT,
  })
  fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: createBodyFormRequest(getState().form.formLogin.inputs),
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.success) {
        dispatch({
          type: LOGIN_FORM_SUBMIT_SUCCESS,
        })
        dispatch({
          type: GET_USER_FORM_SUBMIT_SUCCESS,
          value: res.user,
        })
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FORM_SUBMIT_FAILED,
      })
    })
}

export const registrationUser = () => (dispatch, getState) => {
  dispatch({
    type: REGISTRATION_FORM_SUBMIT,
  })
  fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: createBodyFormRequest(getState().form.formRegister.inputs),
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.success) {
        dispatch({
          type: REGISTRATION_FORM_SUBMIT_SUCCESS,
        })
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      dispatch({
        type: REGISTRATION_FORM_SUBMIT_FAILED,
      })
    })
}

export const forgotPassRequest = () => (dispatch, getState) => {
  dispatch({
    type: FORGOT_PASS_FORM_SUBMIT,
  })
  fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    body: createBodyFormRequest(getState().form.formForgotPassword.inputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.success && res.message === 'Reset email sent') {
        console.log(res)
        dispatch({
          type: FORGOT_PASS_FORM_SUBMIT_SUCCESS,
        })
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASS_FORM_SUBMIT_FAILED,
      })
    })
}

export const resetPassRequest = () => (dispatch, getState) => {
  dispatch({
    type: RESET_PASS_FORM_SUBMIT,
  })
  fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    body: createBodyFormRequest(getState().form.formResetPassword.inputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      if (res.success && res.message === 'Reset email sent') {
        dispatch({
          type: RESET_PASS_FORM_SUBMIT_SUCCESS,
        })
        return res
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASS_FORM_SUBMIT_FAILED,
      })
    })
}
