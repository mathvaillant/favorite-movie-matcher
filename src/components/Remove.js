import React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { useDispatch } from 'react-redux'
import {
  removeLikeFromStorage,
  removeDislikeFromStorage,
} from '../actions/moviesActions'
import PropTypes from 'prop-types'

const Remove = ({ id, likeDislike }) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    if (likeDislike === 'like') {
      dispatch(removeLikeFromStorage(id))
    } else {
      dispatch(removeDislikeFromStorage(id))
    }
  }

  return (
    <button
      style={{
        position: 'relative',
        left: 0,
        top: '15px',
        marginBottom: '-0.7rem',
        padding: '0.4rem 0.56rem',
        backgroundColor: 'black',
        color: 'rgb(255, 209, 110)',
        borderRadius: '50%',
        zIndex: 1000,
      }}>
      <CloseIcon onClick={handleClick} />
    </button>
  )
}

Remove.propTypes = {
  id: PropTypes.number.isRequired,
  likeDislike: PropTypes.string.isRequired,
}

export default Remove
