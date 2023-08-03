import { TapeFeed } from '../../components/tape-feed/tape-feed'
import { ReportFeeds } from '../../components/report-feeds/report-feeds'
import { useDispatch, useSelector } from 'react-redux'
import { addStatusOrders, wsConnect } from '../../services/feed/feed-slice'
import { useEffect } from 'react'

export function Feeds() {
  const dispatch = useDispatch()
  const feeds = useSelector((state) => state.feed.feeds)
  const statusOrders = useSelector((state) => state.feed.statusOrders)
  const total = useSelector((state) => state.feed.total)
  const totalToday = useSelector((state) => state.feed.totalToday)

  useEffect(() => {
    dispatch(addStatusOrders(feeds))
  }, [feeds])

  return (
    <>
      <TapeFeed feeds={feeds}>
        <h2 className={`$text text_type_main-large`}>Лента заказов</h2>
      </TapeFeed>
      <ReportFeeds statusOrders={statusOrders} total={total} totalToday={totalToday} />
    </>
  )
}
