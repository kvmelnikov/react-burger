import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_MODAL } from '../../services/actions/modal-action'
import Modal from '../modal/modal'
import { FeedDetail } from '../feed-detail/feed-detail'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailFeed } from '../../services/feed/feed-api-slice'

function ModalFeedDetail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const feedDetail = useSelector((state) => state.feedApi.feedDetail)
  const feedDetailStrucure = useSelector((state) => state.feedApi.feedDetailStrucure)
  const feedDetailRequest = useSelector((state) => state.feedApi.feedDetailRequest)
  const feedDetailFailed = useSelector((state) => state.feedApi.feedDetailFailed)
  const feeds = useSelector((state) => state.feed.feeds)

  useEffect(() => {
    dispatch(getDetailFeed({ feeds: feeds, id: params.id }))
  }, [feeds])

  const showModalIngridientDetails = useSelector((state) => state.modal.modalIngridientDetail)

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL })
    navigate('/feed')
  }

  const handleEscapeClose = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal()
      navigate('/feed')
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscapeClose)

    return () => {
      document.removeEventListener('keydown', handleEscapeClose)
    }
  }, [])

  return (
    showModalIngridientDetails && (
      <Modal handleCloseModal={handleCloseModal} heading=''>
        <FeedDetail
          feedDetailFailed={feedDetailFailed}
          feedDetailRequest={feedDetailRequest}
          feedDetail={feedDetail}
          feedDetailStrucure={feedDetailStrucure}
        />
      </Modal>
    )
  )
}

export default ModalFeedDetail
