import { TapeFeed } from '../../components/tape-feed/tape-feed'
import { ReportFeeds } from '../../components/report-feeds/report-feeds'
import { useDispatch, useSelector } from 'react-redux'
import { addStatusOrders, wsConnect } from '../../services/feed/feed-slice'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'

export function Feeds() {
  const dispatch = useAppDispatch()
  const feeds = useAppSelector((state) => state.feed.feeds)
  const statusOrders = useAppSelector((state) => state.feed.statusOrders)
  const total = useAppSelector((state) => state.feed.total)
  const totalToday = useAppSelector((state) => state.feed.totalToday)
  useEffect(() => {
    dispatch(addStatusOrders(feeds))
  }, [feeds])

  console.log(feeds)

  return (
    <>
      <TapeFeed feeds={feeds}>
        <h2 className={`$text text_type_main-large`}>Лента заказов</h2>
      </TapeFeed>

      <ReportFeeds statusOrders={statusOrders} total={total} totalToday={totalToday} />
    </>
  )
}
