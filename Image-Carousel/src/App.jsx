import React from 'react'

const App = () => {

  function fetchImage(){
    const url = 'https://www.reddit.com/r/aww/top/.json?t=all';
  }

  return (
    <div>
      <button>{"<"}</button>
      <img src="" alt="not-found" />
      <button>{">"}</button>
    </div>
  )
}

export default App