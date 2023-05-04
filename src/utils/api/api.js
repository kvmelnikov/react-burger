export default class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;

  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getIngredients() {
    return fetch(this._baseUrl + "ingredients", { method: "get" }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getCheckout(ingredients) {
  
    return fetch(`${this._baseUrl + "orders"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredients
      }),
    }).then((res) => {
     
      return this._checkResponse(res);
    });
  }
}
