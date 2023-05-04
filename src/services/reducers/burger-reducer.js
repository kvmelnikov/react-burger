//import {initialState} from "./index";
import {

  ADD_TOPPING_TO_BURGER_CONSTRUCTOR,
  ADD_BUN_TO_BURGER_CONSTRUCTOR,
  DELETE_INGREDIENT_IN_CONSTRUCTOR,
  INSERT_INGREDIENT_IN_CONSTRUCTOR,
  SET_NUMBER_ORDER,
  ClEAR_BUN_AND_TOPPING,
  ClEAR_NUMBER_ORDER
} from "../actions/burger-action";


const initialState = {
  numberOrder: 0,
  ingridientsForConstructor: {
    bun: {},
    toppings: [],
  },
}


export const burgerReducer = (state = initialState, action) => {


  switch (action.type) {
    case ClEAR_NUMBER_ORDER: {
      return {
        ...state,
        numberOrder: 0,
      }
    }


    case ClEAR_BUN_AND_TOPPING: {
      return {
        ...state,
        ingridientsForConstructor: {
          bun: {},
          toppings: [],
        },
      }
    }

    case SET_NUMBER_ORDER: {
      return {
        ...state,
        numberOrder: action.value,
      }
    }
    
    
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

    default: {
      return state;
    }
  }
};
