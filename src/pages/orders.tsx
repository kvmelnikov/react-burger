import { TapeFeed } from '../components/tape-feed/tape-feed'
import { useAppSelector } from '../utils/hooks/hook'

export const Orders = () => {
  const orders = useAppSelector((state) => state.orders.orders)
  console.log('orders', orders)
  const reverseOrders = [...orders].reverse()
  if (reverseOrders) {
    return (
      <>
        <TapeFeed feeds={reverseOrders} />
      </>
    )
  } else {
    return <div></div>
  }
}
