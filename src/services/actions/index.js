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
export const SHOW_MODAL_ORDER_DETAILS = "SHOW_MODAL_ORDER_DETAILS";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_MODAL_SELECTOR = "SET_MODAL_SELECTOR";
export const SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR =
  "SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR";
export const ADD_TOPPING_TO_BURGER_CONSTRUCTOR = 'ADD_TOPPING_TO_BURGER_CONSTRUCTOR';
export const INCREASE_COUNTER_INGREDIENT = 'INCREASE_COUNTER_INGREDIENT';
export const ADD_BUN_TO_BURGER_CONSTRUCTOR = 'ADD_BUN_TO_BURGER_CONSTRUCTOR';
export const DECREASE_COUNTER_INGREDIENT = 'DECREASE_COUNTER_INGREDIENT';
export const DELETE_INGREDIENT_IN_CONSTRUCTOR = 'DELETE_INGREDIENT_IN_CONSTRUCTOR';
export const INSERT_INGREDIENT_IN_CONSTRUCTOR = 'INSERT_INGREDIENT_IN_CONSTRUCTOR';
export const GET_INGREDIENTS = 'GET_INGREDIENTS'

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


export const movieTopping = (dragIndex, hoverIndex) =>{

  return function(dispatch) {
    dispatch({type: INSERT_INGREDIENT_IN_CONSTRUCTOR, dragIndex: dragIndex, hoverIndex:hoverIndex })
  }
}


export const deleteTopping  = (ingredientId, index) => {

  return function(dispatch) {
        dispatch({type: DECREASE_COUNTER_INGREDIENT, id: ingredientId})
        dispatch({type: DELETE_INGREDIENT_IN_CONSTRUCTOR, indx: index})    
  }
}


export const addBunInConstructor  = (ingredient, currentIdBun) => {
  console.log( ingredient,currentIdBun)
  return function(dispatch) {
      if(currentIdBun){
        dispatch({type: DECREASE_COUNTER_INGREDIENT, id: currentIdBun})
      }
     
      dispatch({type: ADD_BUN_TO_BURGER_CONSTRUCTOR, bun: ingredient})
      dispatch({type: INCREASE_COUNTER_INGREDIENT,  id: ingredient._id })
  }
}

export const addToppingInConstructor = (ingredient) => {
  return function(dispatch) {

    dispatch({type: ADD_TOPPING_TO_BURGER_CONSTRUCTOR, topping: ingredient})
    dispatch({type: INCREASE_COUNTER_INGREDIENT,  id: ingredient._id })
  }
}

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
