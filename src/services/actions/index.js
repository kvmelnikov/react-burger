import Api from "../../utils/api/api.js";

export const GET_INGRIDIENT_REQUEST = "GET_INGRIDIENT_REQUEST";
export const GET_INGRIDIENT_SUCCESS = "GET_INGRIDIENT_SUCCESS";
export const GET_INGRIDIENT_FAILED = "GET_INGRIDIENT_FAILED";
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const SET_CURRENT_INGRIDIENT = "SET_CURRENT_INGRIDIENT";
export const SHOW_MODAL_INGRIDIENT_DETAILS =
  "SET_SHOW_MODAL_INGRIDIENT_DETAILS";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_MODAL_SELECTOR = "SET_MODAL_SELECTOR";
export const SET_INGRIDIENTS_FOR_BURGER_CONSTRUCTOR =
  "SET_INGRIDIENTS_FOR_BURGER_CONSTRUCTOR";

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/",
});

const makeConstructorData = (ingredientsForConstructor) => {
  const data = {};
  data.toppings = [];
  ingredientsForConstructor.forEach((el) => {
    if (el.type !== "bun") {
      data.toppings.push(el);
    } else {
      data.bun = el;
    }
  });
  return data;
};


const makeCheckout = (consrtuctorIngridients) => {
  const idToppings = consrtuctorIngridients.toppings.map((el) => {
    return el._id;
  });
  idToppings.push(consrtuctorIngridients.bun._id);
  return idToppings;
};


export const getIngridients = () => {

    return function (dispatch) {
        dispatch({
          type: GET_INGRIDIENT_REQUEST,
        });
        api
          .getIngridients()
          .then((data) => {
            dispatch({ type: GET_INGRIDIENT_SUCCESS, value: data.data });
            dispatch({
              type: SET_INGRIDIENTS_FOR_BURGER_CONSTRUCTOR,
              value: makeConstructorData(data.data),
            });
          })
          .catch(() => {
            dispatch({ type: GET_INGRIDIENT_FAILED });
          });
      };

};


export const getOrderNumber = (consrtuctorIngridients) => {

  return function (dispatch) {
      dispatch({
        type: GET_ORDER_NUMBER_REQUEST,
      });
      api
      .getCheckout(makeCheckout(consrtuctorIngridients))
      .then((resp) => {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS, value: resp.order.number   
        })

      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_NUMBER_FAILED });
      });
    };

};
