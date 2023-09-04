import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { FeedDetail } from '../../components/feed-detail/feed-detail'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
import { getDetaiFeedlRequest, wsConnect, wsDisconnect } from '../../services/feed/feed-slice'
import { LIVE_TABLE_SERVER_URL } from '../main-b/main-b'

export function FeedDetailPage() {
  const dispatch = useAppDispatch()
  const params = useParams()
  const feedDetail = useAppSelector((state) => state.feed.feedDetail)
  const feedDetailStrucure = useAppSelector((state) => state.feed.feedDetailStrucure)
  const feedDetailRequest = useAppSelector((state) => state.feed.requestDetail)
  const feedDetailFailed = useAppSelector((state) => state.feed.failedDetail)
  const sumIngredients = useAppSelector((state) => state.feed.sumIngredients)
  const feeds = useAppSelector((state) => state.feed.feeds)
  const status = useAppSelector((state) => state.feed.status)

  useEffect(() => {
    if (params.id && feeds.length > 0) {
      dispatch(getDetaiFeedlRequest({ feeds: feeds, id: params.id }))
    }
  }, [feeds])

  useEffect(() => {
    if ((feeds.length === 0 && status === 'OFFLINE') || status === 'DISCONNECT') {
      dispatch(wsConnect(LIVE_TABLE_SERVER_URL))
    }
  }, [])

  const content = useMemo(() => {
    if (feedDetail && feedDetailStrucure) {
      return (
        <FeedDetail
          feedDetailFailed={feedDetailFailed}
          feedDetailRequest={feedDetailRequest}
          feedDetail={feedDetail}
          feedDetailStrucure={feedDetailStrucure}
          sumIngredients={sumIngredients}
        />
      )
    } else {
      return <div></div>
    }
  }, [feedDetail, feedDetailStrucure])

  return content
}
