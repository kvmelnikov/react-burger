import { setCookie } from '../cookie'

export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getIngredients() {
    return fetch(this._baseUrl + 'ingredients', { method: 'get' }).then((res) => {
      return this._checkResponse(res)
    })
  }
  getUser(token) {
    return fetch(this._baseUrl + 'auth/user', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    }).then((res) => {
      return this._checkResponse(res)
    })
  }

  updateToken(token) {
    return fetch('https://norma.nomoreparties.space/api/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: `${token}` }),
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        setCookie('accessToken', res.accessToken, { expires: 1200 })
      }
      return this._checkResponse(res)
    })
  }

  getCheckout(ingredients) {
    const accessToken = localStorage.getItem('accessToken')

    return fetch(`${this._baseUrl + 'orders'}?token=${accessToken.split(' ')[1]}`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        ingredients: ingredients,
      }),
    }).then((res) => {
      return this._checkResponse(res)
    })
  }
}
