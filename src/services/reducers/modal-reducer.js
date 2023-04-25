import {initialState} from "./index";

import {
  SHOW_MODAL_INGRIDIENT_DETAILS,
  SHOW_MODAL_ORDER_DETAILS,
  CLOSE_MODAL,
  SET_MODAL_SELECTOR,

} from "../actions/modal-action";




export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
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

case SHOW_MODAL_ORDER_DETAILS: {
    return {
      ...state,
      showModalOrderDetails: true
    }
}



default: {
  return state;
}
  }
}