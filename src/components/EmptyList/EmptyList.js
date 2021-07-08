import React from 'react'
import { Link } from 'react-router-dom'
import './EmptyList.scss'

const EmptyList = () => {
  return (
    <>
      <span>
        <h4>This list is empty</h4>
        <Link to='/' className='backBtn'>
          Go Back
        </Link>
      </span>
    </>
  )
}

export default EmptyList
