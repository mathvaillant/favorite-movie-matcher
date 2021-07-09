import axios from 'axios'

import {
  LIST_MOVIES_REQUEST,
  LIST_MOVIES_SUCCESS,
  LIST_MOVIES_FAIL,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAIL,
  LIKE_MOVIE_REQUEST,
  LIKE_MOVIE_SUCCESS,
  LIKE_MOVIE_FAIL,
  DISLIKE_MOVIE_REQUEST,
  DISLIKE_MOVIE_SUCCESS,
  DISLIKE_MOVIE_FAIL,
  DISLIKE_MOVIE_REMOVE,
  LIKE_MOVIE_REMOVE,
} from '../types/movieTypes'

const API_KEY = '3f6918684a78fbbcfec2516649550954'

export const listMovies = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_MOVIES_REQUEST,
    })

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
    )

    const LikesStored = localStorage.getItem('likedMovies')
      ? JSON.parse(localStorage.getItem('likedMovies'))
      : []

    const DislikesStored = localStorage.getItem('dislikedMovies')
      ? JSON.parse(localStorage.getItem('dislikedMovies'))
      : []

    const AllStored = LikesStored.concat(DislikesStored)

    let ArrayIdFromStorage = []

    AllStored.forEach((item) => {
      ArrayIdFromStorage.push(item.id)
    })

    if (ArrayIdFromStorage !== null) {
      const FitleredMovies = data.results.filter(
        (movie) => !ArrayIdFromStorage.includes(movie.id)
      )

      if (FitleredMovies.length !== 0) {
        dispatch({
          type: LIST_MOVIES_SUCCESS,
          payload: FitleredMovies,
        })
      } else {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=2`
        )

        dispatch({
          type: LIST_MOVIES_SUCCESS,
          payload: data.results,
        })
      }
    } else {
      dispatch({
        type: LIST_MOVIES_SUCCESS,
        payload: data.results,
      })
    }
  } catch (error) {
    dispatch({
      type: LIST_MOVIES_FAIL,
      payload: { message: 'Something went wrong...' },
    })
  }
}

export const searchMovies = (keyWord) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_MOVIES_REQUEST,
    })

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keyWord}`
    )

    const LikesStored = localStorage.getItem('likedMovies')
      ? JSON.parse(localStorage.getItem('likedMovies'))
      : []

    const DislikesStored = localStorage.getItem('dislikedMovies')
      ? JSON.parse(localStorage.getItem('dislikedMovies'))
      : []

    const AllStored = LikesStored.concat(DislikesStored)

    let ArrayIdFromStorage = []

    AllStored.forEach((item) => {
      ArrayIdFromStorage.push(item.id)
    })

    if (ArrayIdFromStorage !== null && data.results.length !== 0) {
      const FitleredMovies = data.results.filter(
        (movie) => !ArrayIdFromStorage.includes(movie.id)
      )

      dispatch({
        type: SEARCH_MOVIES_SUCCESS,
        payload: FitleredMovies,
      })
    } else {
      // TMDB API doest not return error, only empty array when not found.
      // That's why I dispatch the error here below
      dispatch({
        type: SEARCH_MOVIES_FAIL,
        payload: { message: `No results found for: ${keyWord}` },
      })
    }
  } catch (error) {
    dispatch({
      type: SEARCH_MOVIES_FAIL,
      payload: console.error(error),
    })
  }
}

export const likeMovies = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIKE_MOVIE_REQUEST,
    })

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )

    let likedArray

    if (localStorage.getItem('likedMovies')) {
      likedArray = JSON.parse(localStorage.getItem('likedMovies'))

      likedArray.push(data)

      localStorage.setItem('likedMovies', JSON.stringify(likedArray))
    } else {
      likedArray = []

      likedArray.push(data)

      localStorage.setItem('likedMovies', JSON.stringify(likedArray))
    }

    dispatch({
      type: LIKE_MOVIE_SUCCESS,
      payload: likedArray,
    })
  } catch (error) {
    dispatch({
      type: LIKE_MOVIE_FAIL,
      payload: error,
    })
  }
}

export const dislikeMovies = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISLIKE_MOVIE_REQUEST,
    })

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )

    let dislikedArray

    if (localStorage.getItem('dislikedMovies')) {
      dislikedArray = JSON.parse(localStorage.getItem('dislikedMovies'))

      dislikedArray.push(data)

      localStorage.setItem('dislikedMovies', JSON.stringify(dislikedArray))
    } else {
      dislikedArray = []

      dislikedArray.push(data)

      localStorage.setItem('dislikedMovies', JSON.stringify(dislikedArray))
    }

    dispatch({
      type: DISLIKE_MOVIE_SUCCESS,
      payload: dislikedArray,
    })
  } catch (error) {
    dispatch({
      type: DISLIKE_MOVIE_FAIL,
      payload: error,
    })
  }
}

export const removeLikeFromStorage = (id) => (dispatch) => {
  const likedArray = JSON.parse(localStorage.getItem('likedMovies'))

  const likedArrayFiltered = likedArray.filter((movie) => movie.id !== id)

  localStorage.setItem('likedMovies', JSON.stringify(likedArrayFiltered))

  dispatch({
    type: LIKE_MOVIE_REMOVE,
    payload: likedArrayFiltered,
  })
}

export const removeDislikeFromStorage = (id) => (dispatch) => {
  const dislikedArray = JSON.parse(localStorage.getItem('dislikedMovies'))

  const dislikedArrayFiltered = dislikedArray.filter((movie) => movie.id !== id)

  dispatch({
    type: DISLIKE_MOVIE_REMOVE,
    payload: dislikedArrayFiltered,
  })

  localStorage.setItem('dislikedMovies', JSON.stringify(dislikedArrayFiltered))
}
