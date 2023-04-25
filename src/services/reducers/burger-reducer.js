import {initialState} from "./index";
import {

  ADD_TOPPING_TO_BURGER_CONSTRUCTOR,
  ADD_BUN_TO_BURGER_CONSTRUCTOR,
  DELETE_INGREDIENT_IN_CONSTRUCTOR,
  INSERT_INGREDIENT_IN_CONSTRUCTOR
} from "../actions";


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

    // case SET_INGREDIENTS_FOR_BURGER_CONSTRUCTOR: {
    //     return {
    //         ...state,
    //         ingridientsForConstructor: {
    //             ...state.ingridientsForConstructor,
    //             bun: action.value.bun,
    //             toppings: action.value.toppings
    //         }
    //     }
    // }



    default: {
      return state;
    }
  }
};
