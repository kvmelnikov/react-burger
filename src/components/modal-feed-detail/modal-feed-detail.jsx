import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_MODAL } from '../../services/actions/modal-action'
import Modal from '../modal/modal'
import { FeedDetail } from '../feed-detail/feed-detail'

function ModalFeedDetail(props) {
  const dispatch = useDispatch()
  console.log('dfdfd')

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL })
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
    true && (
      <Modal heading=''>
        <FeedDetail />
      </Modal>
    )
  )
}

export default ModalFeedDetail
