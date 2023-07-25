import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_MODAL } from '../../services/actions/modal-action'
import Modal from '../modal/modal'
import { FeedDetail } from '../feed-detail/feed-detail'
import { getDetailFeed } from '../../services/feed/feed-api-slice'
import { useNavigate, useParams } from 'react-router-dom'

function ModalOrderDetail(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const feedDetail = useSelector((state) => state.feedApi.feedDetail)
  const feedDetailStrucure = useSelector((state) => state.feedApi.feedDetailStrucure)
  const feedDetailRequest = useSelector((state) => state.feedApi.feedDetailRequest)
  const feedDetailFailed = useSelector((state) => state.feedApi.feedDetailFailed)
  const orders = useSelector((state) => state.orders.orders)

  useEffect(() => {
    dispatch(getDetailFeed({ feeds: orders, id: params.id }))
  }, [])

  const showModalIngridientDetails = useSelector((state) => state.modal.modalIngridientDetail)

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL })
    navigate('/profile/orders')
  }

  const handleEscapeClose = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal()
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

export default ModalOrderDetail
