export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers || null;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    console.log(options);
    return fetch(url, {
      body: JSON.stringify(options.body),
      method: options.method,
    }).then(this._checkResponse);
  }

  getIngridients() {
    return this._request(this._baseUrl + "ingredients", { method: "get" });
  }

  //   getCheckout(ingredients) {
  //     return this._request(this._baseUrl + "orders", {
  //       body: { ingredients: ingredients },
  //       method: 'POST',
  //     });
  //   }
  // }

  getCheckout(ingrs) {
    console.log(ingrs);
    return fetch(`${this._baseUrl + "orders"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: [
          "60666c42cc7b410027a1a9b5",
          "60666c42cc7b410027a1a9b6",
          "60666c42cc7b410027a1a9b7",
          "60666c42cc7b410027a1a9b9",
          "60666c42cc7b410027a1a9b1",
        ],
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
