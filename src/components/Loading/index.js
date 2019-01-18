import React from 'react'
import './style.css'

const Loading = props => {
  return (
    <div class="loading-wrapper">
      <div class="loading">
        <div class="clock-hand minute-hand"></div>
        <div class="clock-hand hour-hand"></div>
      </div>
    </div>
  )
}

export default Loading