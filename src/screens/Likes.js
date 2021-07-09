import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeLikeFromStorage } from '../actions/moviesActions'
import { useAlert } from 'react-alert'
import Spinner from '../components/Spinner/Spinner'
import Movie from '../components/Movie/Movie'
import EmptyList from '../components/EmptyList/EmptyList'
import CloseIcon from '@material-ui/icons/Close'
import HeartImg from '../images/heart.png'
import '../styles/_default.scss'

const Likes = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const moviesLike = useSelector((state) => state.moviesLike)
  const { loading, likedMovies } = moviesLike

  const removeButtonHandler = (id) => {
    dispatch(removeLikeFromStorage(id))
    alert.success('Successfuly removed!')
  }

  return (
    <div className='Likes'>
      <h2>
        {likedMovies?.length} Favorites <br />
        <img width='30px' height='30px' src={HeartImg} alt='' />
      </h2>
      {loading && <Spinner />}
      {likedMovies.length !== 0 ? (
        <div className='Likes__inner'>
          {likedMovies.map((movie) => (
            <div key={movie.id}>
              <button className='removeBtn'>
                <CloseIcon
                  onClick={() => {
                    removeButtonHandler(movie.id)
                  }}
                />
              </button>
              <Movie
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                title={movie.title}
                vote_average={movie.vote_average}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  )
}

export default Likes
