import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../modal/modal'
import { FeedDetail } from '../feed-detail/feed-detail'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailFeed } from '../../services/feed/feed-api-slice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks/hook'
import { getDetaiFeedlRequest } from '../../services/feed/feed-slice'
import { stat } from 'fs'
import { closeModal } from '../../services/modal/modal-slice'

export function ModalFeedDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const feedDetail = useAppSelector((state) => state.feed.feedDetail)
  const feedDetailStrucure = useAppSelector((state) => state.feed.feedDetailStrucure)
  const feedDetailRequest = useAppSelector((state) => state.feed.requestDetail)
  const feedDetailFailed = useAppSelector((state) => state.feed.failedDetail)
  const sumIngredients = useAppSelector((state) => state.feed.sumIngredients)
  const feeds = useAppSelector((state) => state.feed.feeds)

  useEffect(() => {
    if (params.id) {
      dispatch(getDetaiFeedlRequest({ feeds: feeds, id: params.id }))
    }
  }, [feeds])

  const showModalIngridientDetails = useAppSelector((state) => state.modal.modalIngridientDetail)

  const handleCloseModal = () => {
    dispatch(closeModal)
    navigate('/feed')
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
