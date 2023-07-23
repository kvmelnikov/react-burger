export const getNumberOrder = (id, feeds) => {
  const res = feeds.filter((el) => feeds._id === id)

  console.log(id, feeds)
}

const checkDate = (date) => {
  const today = new Date().getDate()
  const dateOrder = new Date(date).getDate()
  if (today === dateOrder) {
    return 'Сегодня'
  }
}

export const addStatus = (feeds) => {
  const done = []
  const pending = []
  let todayBurgers = 0
  let allBurgers = 0

  feeds.forEach((element) => {
    if (element.status === 'done') {
      const date = new Date()
      if (checkDate(element.updatedAt) === 'Сегодня') {
        todayBurgers += 1
      }
      done.push(element.number)
    } else if (element.status === 'pending') {
      pending.push(element.number)
    }
    allBurgers += 1
  })

  return { done: done, pending: pending, todayBurgers: todayBurgers, allBurgers: allBurgers }
}
