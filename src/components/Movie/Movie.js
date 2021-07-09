import React from 'react'
import PropTypes from 'prop-types'

import './Movie.scss'

const baseImgUrl = 'https://image.tmdb.org/t/p/w500/'

const Movie = ({
  backdrop_path,
  title,
  vote_average,
  poster_path,
  shadowIndex,
  shadowIndexPlus,
}) => {
  return (
    <div
      className={
        shadowIndex + shadowIndexPlus <= 5
          ? 'movieCardBack'
          : shadowIndex + shadowIndexPlus <= 15
          ? 'movieCardMiddle'
          : 'movieCard'
      }
      style={{
        backgroundImage: `url(${
          baseImgUrl + `${backdrop_path !== null ? backdrop_path : poster_path}`
        }`,
      }}>
      <span
        className={
          vote_average <= 4.9
            ? 'span0'
            : vote_average <= 6.9
            ? 'span5'
            : 'span10'
        }>
        {vote_average}
      </span>
      <h1>{title}</h1>
    </div>
  )
}

Movie.propTypes = {
  backdrop_path: PropTypes.string,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  direction: PropTypes.string,
  vote_average: PropTypes.number.isRequired,
  shadowIndex: PropTypes.number,
  shadowIndexPlus: PropTypes.number,
}

export default Movie
