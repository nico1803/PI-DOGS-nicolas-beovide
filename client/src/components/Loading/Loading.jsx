import React from 'react'
import './loading.css'
import loadingGif from '../../assets/LoadingGif.gif'


export default function Loading() {
  return (
    <div>
      <div className='loadingGif'>
        <img className='LoadingIcon' src={loadingGif} alt="Loading" />
        <p className='P'>Loading .. .</p>
      </div>
    </div>
  )
}

