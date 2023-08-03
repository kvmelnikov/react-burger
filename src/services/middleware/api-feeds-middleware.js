const modificateOrder = (currentIngredients, orderIngredients) => {
  const result = []
  let sumResult = 0
  orderIngredients.forEach((elementOrderIngredient) => {
    const ingredient = {}
    currentIngredients.forEach((elementCurrentIngredient) => {
      if (elementCurrentIngredient._id === elementOrderIngredient) {
        const currentQuantity = result.find((element) => element.id === elementOrderIngredient)
        if (currentQuantity) {
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
export const apiFeedsMiddleware = (apiActions) => {
  return (store) => {
    return (next) => (action) => {
      const { dispatch, getState } = store
      const { type } = action
      const {
        getDetailFeed,
        getDetailRequestSuccess,
        getDetailRequestFailed,
        getDetailRequest,
        setFeedDetail,
        setFeedDetailStructure,
      } = apiActions
      if (getDetailFeed.type === type) {
        const currentFeeds = action.payload.feeds
        if (currentFeeds.length > 0) {
          const elementFeeds = currentFeeds.filter((el) => action.payload.id === el._id)
          const orderNumber = elementFeeds[0].number
          dispatch(getDetailRequest())
          fetch(`https://norma.nomoreparties.space/api/orders/${orderNumber}`, {
            method: 'GET',
          })
            .then((res) => {
              if (res.ok) {
                return res.json()
              }
              return Promise.reject('Ошибка')
            })
            .then((res) => {
              const currentIngredients = getState().ingredients.ingridients
              const orderIngredients = res.orders[0].ingredients
              dispatch(getDetailRequestSuccess())
              dispatch(setFeedDetail(res.orders[0]))
              dispatch(setFeedDetailStructure(modificateOrder(currentIngredients, orderIngredients)))
            })
            .catch((err) => {
              dispatch(getDetailRequestFailed())
            })
        }
      }
      next(action)
    }
  }
}
