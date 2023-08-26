import React, { useEffect, useMemo } from 'react'
import Modal from '../modal/modal'
import { FeedDetail } from '../feed-detail/feed-detail'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
import { getDetaiFeedlRequest } from '../../services/feed/feed-slice'
import { closeModal } from '../../services/modal/modal-slice'

function ModalOrderDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const feedDetail = useAppSelector((state) => state.feed.feedDetail)
  const feedDetailStrucure = useAppSelector((state) => state.feed.feedDetailStrucure)
  const feedDetailRequest = useAppSelector((state) => state.feed.requestDetail)
  const feedDetailFailed = useAppSelector((state) => state.feed.failedDetail)
  const sumIngredients = useAppSelector((state) => state.feed.sumIngredients)
  const orders = useAppSelector((state) => state.orders.orders)
  console.log(orders, 'orders')

  useEffect(() => {
    if (params.id) {
      dispatch(getDetaiFeedlRequest({ feeds: orders, id: params.id }))
    }
  }, [])

  const showModalIngridientDetails = useAppSelector((state) => state.modal.modalIngridientDetail)

  const handleCloseModal = () => {
    dispatch(closeModal())
    navigate('/profile/orders')
  }

  const handleEscapeClose = (e: KeyboardEvent) => {
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

  const content = useMemo(() => {
    console.log(showModalIngridientDetails, feedDetailStrucure, showModalIngridientDetails)

    if (feedDetail && feedDetailStrucure && showModalIngridientDetails) {
      return (
        <Modal handleCloseModal={handleCloseModal} heading=''>
          <FeedDetail
            feedDetailFailed={feedDetailFailed}
            feedDetailRequest={feedDetailRequest}
            feedDetail={feedDetail}
            feedDetailStrucure={feedDetailStrucure}
            sumIngredients={sumIngredients}
          />
        </Modal>
      )
    } else {
      return <div></div>
    }
  }, [feedDetail, feedDetailStrucure])

  return content
}

export default ModalOrderDetail
