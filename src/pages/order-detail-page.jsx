import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetailFeed } from '../services/feed/feed-api-slice'
import { FeedDetail } from '../components/feed-detail/feed-detail'
import { getUserRequest } from '../services/actions/form-action'

export function OrderDetailPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const feedDetail = useSelector((state) => state.feedApi.feedDetail)
  const feedDetailStrucure = useSelector((state) => state.feedApi.feedDetailStrucure)
  const feedDetailRequest = useSelector((state) => state.feedApi.feedDetailRequest)
  const feedDetailFailed = useSelector((state) => state.feedApi.feedDetailFailed)
  const feeds = useSelector((state) => state.orders.orders)
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserRequest())
    }
  }, [])

  useEffect(() => {
    dispatch(getDetailFeed({ feeds: feeds, id: params.id }))
  }, [feeds])

  console.log(feeds)
  return (
    <FeedDetail
      feedDetailFailed={feedDetailFailed}
      feedDetailRequest={feedDetailRequest}
      feedDetail={feedDetail}
      feedDetailStrucure={feedDetailStrucure}
    />
  )
}
