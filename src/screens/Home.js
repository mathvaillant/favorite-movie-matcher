import React from 'react'
import Movies from '../components/Movies/Movies'
import Search from '../components/Search/Search'
import LOGO from '../images/logo.png'
import '../styles/_default.scss'

const Home = () => {
  return (
    <div className='Home'>
      <img className='logo' width='70px' height='60px' src={LOGO} alt='' />
      <Search />
      <Movies />
    </div>
  )
}

export default Home
