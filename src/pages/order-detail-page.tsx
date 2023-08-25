import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FeedDetail } from '../components/feed-detail/feed-detail'
import { useAppDispatch, useAppSelector } from '../utils/hooks/hook'
import { getDetaiFeedlRequest } from '../services/feed/feed-slice'
import { getUserRequest } from '../services/forms/forms-thunks'

export function OrderDetailPage() {
  const dispatch = useAppDispatch()
  const params = useParams()
  const feedDetail = useAppSelector((state) => state.feed.feedDetail)
  const feedDetailStrucure = useAppSelector((state) => state.feed.feedDetailStrucure)
  const feedDetailRequest = useAppSelector((state) => state.feed.requestDetail)
  const feedDetailFailed = useAppSelector((state) => state.feed.failedDetail)
  const sumIngredients = useAppSelector((state) => state.feed.sumIngredients)
  const orders = useAppSelector((state) => state.orders.orders)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUserRequest())
    }
  }, [])

  useEffect(() => {
    if (params.id) {
      console.log(params)
      dispatch(getDetaiFeedlRequest({ feeds: orders, id: params.id }))
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
