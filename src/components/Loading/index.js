import React from 'react'
import './style.css'

const Loading = props => {
  return (
    <div className="loading-wrapper">
      <div className="loading">
        <div className="clock-hand minute-hand"></div>
        <div className="clock-hand hour-hand"></div>
      </div>
    </div>
  )
}

export default Loading