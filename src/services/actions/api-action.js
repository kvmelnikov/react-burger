import Api from "../../utils/api/api.js";
import { SET_INGREDIENTS } from "./ingridients-action.js";
import { SHOW_MODAL_ORDER_DETAILS } from "./modal-action.js";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

const api = new Api({
    baseUrl: "https://norma.nomoreparties.space/api/",
  });

  
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
             data.data.map((el)=>{
              return el.count = 0
            })
            dispatch({ type: GET_INGREDIENTS_SUCCESS, value: data.data });
            dispatch({type: SET_INGREDIENTS, value: data.data })
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
        dispatch({
          type: SHOW_MODAL_ORDER_DETAILS
        })


      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_NUMBER_FAILED });
      });
    };

};