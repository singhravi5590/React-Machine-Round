import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className='App'>
      <h1>Star Ratings</h1>
      <div>
        {
          [1, 2, 3, 4, 5].map((item, index) => (
            <button key={index} onClick={() => setRating(item)}
            onMouseOver={() => setHover(item)}
            onMouseLeave={() => setHover(item)}>
              <span className={`star ${item <= (rating && hover) ? 'on' : 'off'}`}>&#9733;</span>
            </button>
          ))
        }
      </div>
    </div>
  )
}

export default App