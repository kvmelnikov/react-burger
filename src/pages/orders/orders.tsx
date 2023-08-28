import { TapeFeed } from '../../components/tape-feed/tape-feed'
import { useAppSelector } from '../../utils/hooks/hook'

export const Orders = () => {
  const orders = useAppSelector((state) => state.orders.orders)

  const reverseOrders = orders ? [...orders].reverse() : null

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
