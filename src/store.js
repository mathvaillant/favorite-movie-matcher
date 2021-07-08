import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  listMoviesReducer,
  searchMoviesReducer,
  likeMovieReducer,
  dislikeMovieReducer,
} from './reducers/moviesReducer'

const reducer = combineReducers({
  moviesList: listMoviesReducer,
  moviesSearch: searchMoviesReducer,
  moviesLike: likeMovieReducer,
  moviesDislike: dislikeMovieReducer,
})

const likesFromStorage = localStorage.getItem('likedMovies')
  ? JSON.parse(localStorage.getItem('likedMovies'))
  : []

const dislikesFromStorage = localStorage.getItem('dislikedMovies')
  ? JSON.parse(localStorage.getItem('dislikedMovies'))
  : []

const initialState = {
  moviesList: [],
  moviesSearch: [],
  moviesLike: { likedMovies: likesFromStorage },
  moviesDislike: { dislikedMovies: dislikesFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
