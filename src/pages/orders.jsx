import { TapeFeed } from '../components/tape-feed/tape-feed'
import { useSelector } from 'react-redux'

export const Orders = () => {
  const orders = useSelector((state) => state.orders.orders)

  return (
    <>
      <TapeFeed feeds={orders} />
    </>
  )
}
