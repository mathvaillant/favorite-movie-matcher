import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LIST_MOVIES_RESET } from '../../types/movieTypes'
import {
  listMovies,
  likeMovies,
  dislikeMovies,
} from '../../actions/moviesActions'
import TinderCard from 'react-tinder-card'
import Spinner from '../Spinner/Spinner'
import Movie from '../Movie/Movie'
import { useAlert } from 'react-alert'
import './Movies.scss'

const Movies = () => {
  const [indexPlus, setIndexPlus] = useState(0)
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
    setIndexPlus((prevState) => prevState + 1)
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
      {error && <h2>{error.message}</h2>}
      {loadingSearch && <Spinner />}
      {errorSearch && <h2>{errorSearch.message}</h2>}
      {moviesSearch === undefined
        ? moviesList?.map((movie, index) => (
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
                shadowIndex={index}
                shadowIndexPlus={indexPlus}
              />
            </TinderCard>
          ))
        : moviesSearch?.map((movie, index) => (
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
                shadowIndex={index}
                shadowIndexPlus={indexPlus}
              />
            </TinderCard>
          ))}
    </div>
  )
}

export default Movies
