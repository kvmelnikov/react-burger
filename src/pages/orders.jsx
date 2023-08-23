import { TapeFeed } from '../components/tape-feed/tape-feed'
import { useSelector } from 'react-redux'

export const Orders = () => {
  const orders = useSelector((state) => state.orders.orders)
  console.log('orders', orders)
  const reverseOrders = [...orders].reverse()
  return (
    <>
      <TapeFeed feeds={reverseOrders} />
    </>
  )
}
