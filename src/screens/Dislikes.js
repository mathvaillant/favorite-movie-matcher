import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeDislikeFromStorage } from '../actions/moviesActions'
import { useAlert } from 'react-alert'
import Spinner from '../components/Spinner/Spinner'
import Movie from '../components/Movie/Movie'
import EmptyList from '../components/EmptyList/EmptyList'
import CloseIcon from '@material-ui/icons/Close'
import Broken from '../images/broken.png'
import '../styles/_default.scss'

const Dislikes = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const moviesDislike = useSelector((state) => state.moviesDislike)
  const { loading, dislikedMovies } = moviesDislike

  const removeButtonHandler = (id) => {
    document.querySelector(`#movie-${id}`).classList =
      'animate__animated animate__backOutRight'

    setTimeout(() => {
      dispatch(removeDislikeFromStorage(id))
      alert.success('Successfuly removed!')
    }, 400)
  }

  return (
    <div className='Dislikes'>
      <h2>
        {dislikedMovies?.length} What the F{'*'}
        <img width='30px' height='30px' src={Broken} alt='' />
      </h2>
      {loading && <Spinner />}
      {dislikedMovies.length !== 0 ? (
        <div className='Dislikes__inner'>
          {dislikedMovies?.map((movie) => (
            <div key={movie.id} id={`movie-${movie.id}`}>
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

export default Dislikes
