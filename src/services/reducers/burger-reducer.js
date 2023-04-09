import {
  GET_INGRIDIENT_REQUEST,
  GET_INGRIDIENT_SUCCESS,
  GET_INGRIDIENT_FAILED,
  SET_CURRENT_INGRIDIENT,
  SHOW_MODAL_INGRIDIENT_DETAILS,
  CLOSE_MODAL,
  SET_MODAL_SELECTOR,
  SET_INGRIDIENTS_FOR_BURGER_CONSTRUCTOR,
  
} from "../actions";

const initialState = {
  ingridientsRequest: false,
  ingridientsFailed: false,  
  ingridients: [],
  ingridientsForConstructor: {
    bun: {},
    toppings: [],
  },
  currentIngridient: {},
  order: {},
  modalIngridientDetail: false,
  modalOrderDetail: false,
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
            modalOrderDetail: false
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

    default: {
      return state;
    }
  }
};
