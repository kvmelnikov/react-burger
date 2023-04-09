import {
  GET_INGRIDIENT_REQUEST,
  GET_INGRIDIENT_SUCCESS,
  GET_INGRIDIENT_FAILED,
  SET_CURRENT_INGRIDIENT,
  SHOW_MODAL_INGRIDIENT_DETAILS,
  CLOSE_MODAL,
  SET_MODAL_SELECTOR,
  SET_INGRIDIENTS_FOR_BURGER_CONSTRUCTOR, 
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED
  
} from "../actions";

const initialState = {
  ingridientsRequest: false,
  ingridientsFailed: false,  
  ingridients: [],
  orderRequest: false,
  orderRequestFailed: false,
  numberOrder: 0,

  ingridientsForConstructor: {
    bun: {},
    toppings: [],
  },
  currentIngridient: {},
  order: {},
  modalIngridientDetail: false,
  modalOrderDetail: false,
  showModalOrderDetails: false,
  modalSelector: {}
};

export const burgerReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case SET_INGRIDIENTS_FOR_BURGER_CONSTRUCTOR: {
        return {
            ...state,
            ingridientsForConstructor: {
                ...state.ingridientsForConstructor,
                bun: action.value.bun,
                toppings: action.value.toppings
            }
        }
    }
    case SET_MODAL_SELECTOR: {
        return {
            ...state,
            modalSelector: action.value
        }
    }

    case CLOSE_MODAL: {
        return {
            ...state,
            modalIngridientDetail: false,
            modalOrderDetail: false,
            showModalOrderDetails: false,
            currentIngridient: {},
        }
    }
    
    case SHOW_MODAL_INGRIDIENT_DETAILS: {
        return {
            ...state,
            modalIngridientDetail: true
        }
    }
    case SET_CURRENT_INGRIDIENT: {
        return {
            ...state, 
            currentIngridient: action.value
        }
    }
    case GET_INGRIDIENT_REQUEST: {
      return {
        ...state,
        ingridientsRequest: true
      }  
    }
    case GET_INGRIDIENT_FAILED: {
        return {
            ...state,
            ingridientsFailed: true,
            ingridientsRequest: false
        }
    }
    case GET_INGRIDIENT_SUCCESS: {
        return {
            ...state,
            ingridientsFailed: false,
            ingridientsRequest: false,
            ingridients: action.value,
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
       console.log('reducer number success')
        return {
            ...state,
            orderRequestFailed: false,
            orderRequest: false,
            numberOrder: action.value,
            showModalOrderDetails: true,
        }
    }


    default: {
      return state;
    }
  }
};
