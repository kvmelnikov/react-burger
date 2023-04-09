import Api from "../../utils/api/api.js";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const SHOW_MODAL_INGRIDIENT_DETAILS =
  "SET_SHOW_MODAL_INGRIDIENT_DETAILS";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_MODAL_SELECTOR = "SET_MODAL_SELECTOR";
export const SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR =
  "SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR";

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


export const getIngredients = () => {
    return function (dispatch) {
        dispatch({
          type: GET_INGREDIENTS_REQUEST,
        });
        api
          .getIngredients()
          .then((data) => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS, value: data.data });
            dispatch({
              type: SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR,
              value: makeConstructorData(data.data),
            });
          })
          .catch(() => {
            dispatch({ type: GET_INGREDIENTS_FAILED });
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
