import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import './Search.scss'
import { useDispatch } from 'react-redux'
import { searchMovies } from '../../actions/moviesActions'

const Search = () => {
  const [keyWord, setKeyWord] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyWord === '') {
      alert('Type a movie name...')
    } else {
      dispatch(searchMovies(keyWord))
    }
  }

  return (
    <div className='Search'>
      <form onSubmit={submitHandler}>
        <SearchIcon className='search__icon' />
        <input
          type='text'
          placeholder='Search'
          onChange={(e) => setKeyWord(e.target.value)}
          value={keyWord}
        />
      </form>
    </div>
  )
}

export default Search
