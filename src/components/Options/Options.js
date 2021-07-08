import React from 'react'
import { Link } from 'react-router-dom'

import './Options.scss'

const Options = () => {
  return (
    <div className='Options'>
      <div className='Options__inner'>
        <Link to='/'>Home</Link>
        <Link to='/likes'>Favorites</Link>
        <Link to='/dislikes'>Wall of Shame</Link>
      </div>
    </div>
  )
}

export default Options
