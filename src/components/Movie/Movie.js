import React from 'react'
import PropTypes from 'prop-types'
import IMDB from '../../images/imdbicon.png'

import './Movie.scss'

const baseImgUrl = 'https://image.tmdb.org/t/p/w500/'

const Movie = ({ backdrop_path, title, vote_average, poster_path }) => {
  return (
    <div
      className='movieCard'
      style={{
        backgroundImage: `url(${
          baseImgUrl + `${backdrop_path !== null ? backdrop_path : poster_path}`
        }`,
      }}>
      <span>
        <img width='40px' height='20px' src={IMDB} alt='' />
        {vote_average}
      </span>
      <h1>{title} </h1>
    </div>
  )
}

Movie.propTypes = {
  backdrop_path: PropTypes.string,
  title: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  direction: PropTypes.string,
  vote_average: PropTypes.number,
}

export default Movie
