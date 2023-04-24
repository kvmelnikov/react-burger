import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
  SHOW_MODAL_INGRIDIENT_DETAILS,
  SHOW_MODAL_ORDER_DETAILS,
  CLOSE_MODAL,
  SET_MODAL_SELECTOR,
  SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR, 
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  ADD_TOPPING_TO_BURGER_CONSTRUCTOR,
  INCREASE_COUNTER_INGREDIENT,
  GET_INGREDIENTS,
  ADD_BUN_TO_BURGER_CONSTRUCTOR,
  DECREASE_COUNTER_INGREDIENT,
  DELETE_INGREDIENT_IN_CONSTRUCTOR,
  INSERT_INGREDIENT_IN_CONSTRUCTOR
} from "../actions";

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,  
  ingridients: [],
  ingridients2: [],

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
  showModalOrderDetails: false,
  modalSelector: {}
};


export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_INGREDIENTS: {
    return {
      ...state,
      ingridients2: [...state.ingridients]
  }
  }
  default: {
    return state;
  }
  }
}


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




export const burgerReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case INSERT_INGREDIENT_IN_CONSTRUCTOR: {
      const newArray = [...state.ingridientsForConstructor.toppings]; 
      
      newArray.splice(
        action.dragIndex,
        0,
        newArray.splice(action.hoverIndex, 1)[0]
      );

      return {
        ...state,
        ingridientsForConstructor: {
          ...state.ingridientsForConstructor,
          toppings: newArray
        }
      }
     }

    case INCREASE_COUNTER_INGREDIENT: {
      return {
        ...state,
        ingridients: [...state.ingridients].map(ingredient => {
         return ingredient._id === action.id ? { ...ingredient, count: ++ingredient.count } : ingredient  
        } )
      };
    }

    case DELETE_INGREDIENT_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingridientsForConstructor: {
          ...state.ingridientsForConstructor,
         toppings: state.ingridientsForConstructor.toppings.length === 1 ? [] : [...state.ingridientsForConstructor.toppings.slice(0, action.indx),
          ...state.ingridientsForConstructor.toppings.slice(action.indx+1)] 

        }
    }
  }

    case DECREASE_COUNTER_INGREDIENT: {
      return {
        ...state,
        ingridients: [...state.ingridients].map(ingredient => {
          return ingredient._id === action.id &&  ingredient.count > 0 ? { ...ingredient, count: --ingredient.count } : ingredient  
         } )
       
      };
    }

    case ADD_TOPPING_TO_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        ingridientsForConstructor: {
            ...state.ingridientsForConstructor,
            toppings: [...state.ingridientsForConstructor.toppings, action.topping]
        }      
    }
  }

  case ADD_BUN_TO_BURGER_CONSTRUCTOR: {
    return {
      ...state,
      ingridientsForConstructor: {
          ...state.ingridientsForConstructor,
          bun: action.bun,
      }      
  }
}

    case SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR: {
        return {
            ...state,
            ingridientsForConstructor: {
                ...state.ingridientsForConstructor,
                bun: action.value.bun,
                toppings: action.value.toppings
            }
        }
    }

    case SET_CURRENT_INGREDIENT: {
        return {
            ...state, 
            currentIngridient: action.value
        }
    }


    default: {
      return state;
    }
  }
};
