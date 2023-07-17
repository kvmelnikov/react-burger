import { useDispatch } from 'react-redux'
//import { FeedActionType } from '../../utils/websocket'

const checkDate = (date) => {
  const today = new Date().getDate()
  const dateOrder = new Date(date).getDate()
  if (today === dateOrder) {
    return 'Сегодня'
  }
}

export const addStatus = (feeds) => {
  console.log(feeds)
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

// const updateData = (table, action) => {
//   return table.map((row) => {
//     const index = action.data.findIndex((updatedRow) => updatedRow.id === row.id)
//     if (index !== -1) {
//       return action.data[index]
//     }
//     return row
//   })
// }

// export const FeedUpdate = (prevTable, actions) => {
//   // actions.forEach((action) => {
//   //   switch (action.type) {
//   //     case FeedActionType.UPDATE:
//   //       table = updateData(table, action);
//   //       break;
//   //     default:
//   //       break;
//   //   }
//   // });

//   return table
// }
