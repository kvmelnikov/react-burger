import {initialState} from "./index";
import {
  SET_INGREDIENTS,
  INCREASE_COUNTER_INGREDIENT,
  DECREASE_COUNTER_INGREDIENT,
  SET_CURRENT_INGREDIENT
} from "../actions";

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS: {
      return {
        ...state,
        ingridients: action.value,
      };
    }

    case INCREASE_COUNTER_INGREDIENT: {
      return {
        ...state,
        ingridients: [...state.ingridients].map((ingredient) => {
          return ingredient._id === action.id
            ? { ...ingredient, count: ++ingredient.count }
            : ingredient;
        }),
      };
    }

    case DECREASE_COUNTER_INGREDIENT: {
      return {
        ...state,
        ingridients: [...state.ingridients].map((ingredient) => {
          return ingredient._id === action.id && ingredient.count > 0
            ? { ...ingredient, count: --ingredient.count }
            : ingredient;
        }),
      };
    }




    default: {
      return state;
    }
  }
};
