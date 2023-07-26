export const addStatus = (feeds) => {
  const done = []
  const pending = []
  feeds.forEach((element) => {
    if (element.status === 'done') {
      done.push(element.number)
    } else if (element.status === 'pending') {
      pending.push(element.number)
    }
  })

  return { done: done, pending: pending }
}
