export default class Api {
  constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers || null;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getIngridients() {
      return fetch(`${this._baseUrl}`)
          .then(res => {
              return this._checkResponse(res)
          });
  }


 

}