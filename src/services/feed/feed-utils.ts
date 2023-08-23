import { IIngredientDetails } from '../../types/types'
import { IOrrder } from './feed-slice'

export const addStatus = (feeds: IOrrder[]) => {
  const done: number[] = []
  const pending: number[] = []
  feeds.forEach((element) => {
    if (element.status === 'done') {
      done.push(element.number)
    } else if (element.status === 'pending') {
      pending.push(element.number)
    }
  })

  return { done: done, pending: pending }
}

export interface IIngredientsFeedDetail {
  image?: string
  name?: string
  price?: number
  id?: string
  quantity?: number
  sumPrice?: number
}

export const modificateOrder = (currentIngredients: IIngredientDetails[], orderIngredients: string[]) => {
  const result: IIngredientsFeedDetail[] = []
  let sumResult = 0
  orderIngredients.forEach((elementOrderIngredient) => {
    const ingredient: IIngredientsFeedDetail = {}
    currentIngredients.forEach((elementCurrentIngredient) => {
      if (elementCurrentIngredient._id === elementOrderIngredient) {
        const currentQuantity = result.find((element) => element.id === elementOrderIngredient)
        if (currentQuantity && currentQuantity.quantity && currentQuantity.price) {
          currentQuantity.quantity = currentQuantity.quantity + 1
          currentQuantity.sumPrice = currentQuantity.quantity * currentQuantity.price
          sumResult += currentQuantity.price
        } else {
          ingredient.image = elementCurrentIngredient.image_mobile
          ingredient.name = elementCurrentIngredient.name
          ingredient.price = elementCurrentIngredient.price
          ingredient.id = elementOrderIngredient
          ingredient.quantity = 1
          ingredient.sumPrice = ingredient.quantity * ingredient.price
          sumResult += ingredient.price
          result.push(ingredient)
        }
      }
    })
  })
  return { ingredients: result, sumIngredients: sumResult }
}
