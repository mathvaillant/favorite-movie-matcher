import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import Movie from '../components/Movie/Movie'
import EmptyList from '../components/EmptyList/EmptyList'
import Remove from '../components/Remove'

const Likes = () => {
  const moviesLike = useSelector((state) => state.moviesLike)
  const { loading, likedMovies } = moviesLike

  return (
    <div className='Likes' style={{ paddingBottom: '1rem' }}>
      <h1>Favorites 😎👍</h1>
      {loading && <Spinner />}
      {likedMovies.length !== 0 ? (
        likedMovies.map((movie) => (
          <div key={movie.id}>
            <Remove id={movie.id} likeDislike={'like'} />
            <Movie
              backdrop_path={movie.backdrop_path}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          </div>
        ))
      ) : (
        <EmptyList />
      )}
    </div>
  )
}

export default Likes
