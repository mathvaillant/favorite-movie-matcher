import React, { useEffect, useMemo, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import FavoriteIcon from '@material-ui/icons/Favorite'
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

  const moviesLike = useSelector((state) => state.moviesLike)
  const { likedMovies } = moviesLike

  const moviesDislike = useSelector((state) => state.moviesDislike)
  const { dislikedMovies } = moviesDislike

  const childListRefs = useMemo(
    () =>
      Array(moviesList?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [moviesList?.length]
  )

  const childSearchRefs = useMemo(
    () =>
      Array(moviesSearch?.length)
        .fill(0)
        .map((i) => React.createRef()),
    [moviesSearch?.length]
  )

  useEffect(() => {
    if (SearchedMovies.length !== 0) {
      dispatch({ type: LIST_MOVIES_RESET })
    } else {
      dispatch(listMovies())
    }
  }, [SearchedMovies.length, dispatch])

  const touchSwipe = (direction, movieId) => {
    setIndexPlus((prevState) => prevState + 1)
    if (direction === 'right') {
      alert.success('LIKE! 😎🎞️')
      dispatch(likeMovies(movieId))
    } else {
      alert.error('NOPE! 🥴🎞️')
      dispatch(dislikeMovies(movieId))
    }
  }

  const clickSwipe = (dir) => {
    const AllStored = likedMovies.concat(dislikedMovies)

    let AllStoredId = []

    AllStored.forEach((item) => {
      AllStoredId.push(item.id)
    })

    const moviesSearchLeft = moviesSearch?.filter(
      (movie) => !AllStoredId?.includes(movie.id)
    )

    const moviesListLeft = moviesList?.filter(
      (movie) => !AllStoredId?.includes(movie.id)
    )

    if (SearchedMovies.length !== 0) {
      const toBeRated = moviesSearchLeft[moviesSearchLeft.length - 1].id
      const index = moviesSearch?.map((movie) => movie.id).indexOf(toBeRated)
      childSearchRefs[index].current.swipe(dir)
    } else {
      const toBeRated = moviesListLeft[moviesListLeft.length - 1].id
      const index = moviesList?.map((movie) => movie.id).indexOf(toBeRated)
      childListRefs[index].current.swipe(dir)
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
              ref={childListRefs[index]}
              onSwipe={(direction) => touchSwipe(direction, movie.id)}
              key={movie.id}
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
              ref={childSearchRefs[index]}
              onSwipe={(direction) => touchSwipe(direction, movie.id)}
              key={movie.id}
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
      <div className='buttons'>
        <CloseIcon
          className='buttons__dislike'
          onClick={() => clickSwipe('left')}
        />

        <FavoriteIcon
          className='buttons__like'
          onClick={() => clickSwipe('right')}
        />
      </div>
    </div>
  )
}

export default Movies
