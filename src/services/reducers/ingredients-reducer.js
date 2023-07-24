import {
  SET_CURRENT_INGREDIENT,
  SET_INGREDIENTS,
  INCREASE_COUNTER_INGREDIENT,
  DECREASE_COUNTER_INGREDIENT,
  CLEAR_INGREDIENTS,
  GET_INGREDIENT,
  GET_IMAGES,
} from '../actions/ingridients-action'

const initialState = {
  ingridients: [],
  currentIngridient: {},
  images: [],
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_INGREDIENTS: {
      return {
        ...state,
        ingridients: [...state.ingridients].map((ingredient) => {
          ingredient.count = 0
          return ingredient
        }),
      }
    }

    case GET_INGREDIENT: {
      return {
        ...state,
        currentIngridient: state.ingridients.filter((el) => {
          return el._id === action.id
        }),
      }
    }

    case GET_IMAGES: {
      const images = []
      let filteredIngredients = []
      action.payload.forEach((el) => {
        state.ingridients.forEach((ingr) => {
          if (ingr._id === el) {
            console.log(ingr)
            images.push({ src: ingr.image_mobile, alt: ingr.name })
          }
        })
      })

      return {
        ...state,
        images: images,
      }
    }

    case SET_INGREDIENTS: {
      return {
        ...state,
        ingridients: action.value,
      }
    }

    case DECREASE_COUNTER_INGREDIENT: {
      return {
        ...state,
        ingridients: [...state.ingridients].map((ingredient) => {
          return ingredient._id === action.id && ingredient.count > 0
            ? { ...ingredient, count: --ingredient.count }
            : ingredient
        }),
      }
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngridient: state.ingridients.filter((el) => el._id === action.value)[0],
      }
    }

    default: {
      return state
    }
  }
}
