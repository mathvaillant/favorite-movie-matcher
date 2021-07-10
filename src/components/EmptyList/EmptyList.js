import React from 'react'
import { Link } from 'react-router-dom'
import './EmptyList.scss'

const EmptyList = () => {
  return (
    <>
      <span className='EmptyList'>
        <h4>Would you like to see some options?</h4>
        <Link to='/' className='backBtn'>
          Go Back
        </Link>
      </span>
    </>
  )
}

export default EmptyList
