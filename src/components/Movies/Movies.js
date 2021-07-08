import React, { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import Spinner from '../Spinner/Spinner'
import Movie from '../Movie/Movie'
import { useDispatch, useSelector } from 'react-redux'
import {
  listMovies,
  likeMovies,
  dislikeMovies,
} from '../../actions/moviesActions'
import { LIST_MOVIES_RESET } from '../../types/movieTypes'
import './Movies.scss'

import { useAlert } from 'react-alert'

const Movies = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const allMovies = useSelector((state) => state.moviesList)
  const { loading, moviesList, error } = allMovies

  const SearchedMovies = useSelector((state) => state.moviesSearch)
  const {
    loading: loadingSearch,
    moviesSearch,
    error: errorSearch,
  } = SearchedMovies

  useEffect(() => {
    if (SearchedMovies.length !== 0) {
      dispatch({ type: LIST_MOVIES_RESET })
    } else {
      dispatch(listMovies())
    }
  }, [SearchedMovies.length, dispatch])

  const swiped = (direction, movieId) => {
    if (direction === 'right') {
      alert.success('LIKE! 😎🎞️')
      dispatch(likeMovies(movieId))
    } else {
      alert.error('NOPE! 🥴🎞️')
      dispatch(dislikeMovies(movieId))
    }
  }

  return (
    <div className='movies__container'>
      {loading && <Spinner />}
      {error && <h3>{error.message}</h3>}
      {loadingSearch && <Spinner />}
      {errorSearch && <h3>{errorSearch.message}</h3>}
      {moviesSearch === undefined
        ? moviesList?.map((movie) => (
            <TinderCard
              onSwipe={(direction) => swiped(direction, movie.id)}
              key={movie.id}
              setClickMovieId={movie.id}
              className='swipe'
              preventSwipe={['up', 'down']}>
              <Movie
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                title={movie.title}
              />
            </TinderCard>
          ))
        : moviesSearch?.map((movie) => (
            <TinderCard
              onSwipe={(direction) => swiped(direction, movie.id)}
              key={movie.id}
              setClickMovieId={movie.id}
              className='swipe'
              preventSwipe={['up', 'down']}>
              <Movie
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                title={movie.title}
              />
            </TinderCard>
          ))}
    </div>
  )
}

export default Movies
