import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import EmptyList from '../components/EmptyList/EmptyList'
import Movie from '../components/Movie/Movie'
import Remove from '../components/Remove'

const Likes = () => {
  const moviesDislike = useSelector((state) => state.moviesDislike)
  const { loading, dislikedMovies } = moviesDislike

  return (
    <div className='Dislikes' style={{ paddingBottom: '1rem' }}>
      <h1>Wall of Shame 🥴👎 </h1>
      {loading && <Spinner />}
      {dislikedMovies.length !== 0 ? (
        dislikedMovies.map((movie) => (
          <>
            <Remove id={movie.id} likeDislike={'dislike'} />
            <Movie
              key={movie.id}
              backdrop_path={movie.backdrop_path}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          </>
        ))
      ) : (
        <EmptyList />
      )}
    </div>
  )
}

export default Likes
