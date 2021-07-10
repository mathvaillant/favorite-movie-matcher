import React from 'react'
import Movies from '../components/Movies/Movies'
import Search from '../components/Search/Search'
import '../styles/_default.scss'

const Home = () => {
  return (
    <div className='Home'>
      <h2>Movie Matcher</h2>
      <Search />
      <Movies />
    </div>
  )
}

export default Home
