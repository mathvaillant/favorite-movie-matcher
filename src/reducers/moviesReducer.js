import {
  LIST_MOVIES_REQUEST,
  LIST_MOVIES_SUCCESS,
  LIST_MOVIES_FAIL,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAIL,
  LIST_MOVIES_RESET,
  LIKE_MOVIE_REQUEST,
  LIKE_MOVIE_SUCCESS,
  LIKE_MOVIE_FAIL,
  DISLIKE_MOVIE_REQUEST,
  DISLIKE_MOVIE_SUCCESS,
  DISLIKE_MOVIE_FAIL,
  LIKE_MOVIE_REMOVE,
  DISLIKE_MOVIE_REMOVE,
} from '../types/movieTypes'

export const listMoviesReducer = (state = { moviesList: [] }, action) => {
  switch (action.type) {
    case LIST_MOVIES_REQUEST:
      return {
        loading: true,
        ...state,
      }
    case LIST_MOVIES_SUCCESS:
      return {
        loading: false,
        moviesList: action.payload,
      }
    case LIST_MOVIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case LIST_MOVIES_RESET:
      return {}
    default:
      return state
  }
}

export const searchMoviesReducer = (state = { moviesSearch: [] }, action) => {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST:
      return {
        loading: true,
        moviesSearch: [],
        ...state,
      }
    case SEARCH_MOVIES_SUCCESS:
      return {
        loading: false,
        moviesSearch: action.payload,
      }
    case SEARCH_MOVIES_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const likeMovieReducer = (state = { likedMovies: [] }, action) => {
  switch (action.type) {
    case LIKE_MOVIE_REQUEST:
      return {
        loading: true,
        likedMovies: [],
        ...state,
      }
    case LIKE_MOVIE_SUCCESS:
      return {
        loading: false,
        likedMovies: action.payload,
      }
    case LIKE_MOVIE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case LIKE_MOVIE_REMOVE:
      return {
        loading: false,
        likedMovies: action.payload,
      }
    default:
      return state
  }
}

export const dislikeMovieReducer = (state = { dislikedMovies: [] }, action) => {
  switch (action.type) {
    case DISLIKE_MOVIE_REQUEST:
      return {
        loading: true,
        dislikedMovies: [],
        ...state,
      }
    case DISLIKE_MOVIE_SUCCESS:
      return {
        loading: false,
        dislikedMovies: action.payload,
      }
    case DISLIKE_MOVIE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case DISLIKE_MOVIE_REMOVE:
      return {
        loading: false,
        dislikedMovies: action.payload,
      }
    default:
      return state
  }
}
