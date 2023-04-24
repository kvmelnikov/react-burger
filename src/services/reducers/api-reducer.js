import {initialState} from "./index";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,

} from "../actions";


export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingridientsRequest: true
      }  
    }
    case GET_INGREDIENTS_FAILED: {
        return {
            ...state,
            ingridientsFailed: true,
            ingridientsRequest: false
        }
    }
    case GET_INGREDIENTS_SUCCESS: {
        return {
            ...state,
            ingridientsFailed: false,
            ingridientsRequest: false,
           
        }
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }  
    }
    case GET_ORDER_NUMBER_FAILED: {
        return {
            ...state,
            orderRequestFailed: true,
            orderRequest: false
        }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
        return {
            ...state,
            orderRequestFailed: false,
            orderRequest: false,
            numberOrder: action.value,
       
        }
    }

  default: {
    return state;
  }
  }
}
