import { TapeFeed } from '../../components/tape-feed/tape-feed'
import { ReportFeeds } from '../../components/report-feeds/report-feeds'
import { useDispatch, useSelector } from 'react-redux'
import { addStatusOrders, wsConnect } from '../../services/feed/feed-slice'
import { useEffect } from 'react'
import { getIngredients } from '../../services/actions/api-action'
export const LIVE_TABLE_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all'

export function Feeds() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(wsConnect(LIVE_TABLE_SERVER_URL))
  }, [])

  const feeds = useSelector((state) => state.feed.feeds)

  useEffect(() => {
    dispatch(addStatusOrders(feeds))
  }, [feeds])

  return (
    <>
      <TapeFeed feeds={feeds} />
      <ReportFeeds />
    </>
  )
}
