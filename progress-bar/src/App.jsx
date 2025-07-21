import React, { useEffect, useState } from 'react'
import Progressbar from './Progressbar';
import './App.css'

const App = () => {
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    let timer;
    if(progress < 100){
      timer = setTimeout(() => {
        setProgress((p) => p+1);
      }, 20)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [progress])
  return (
    <div className="App">
      <Progressbar
        progress={progress}
        color={'lightgreen'}
      />

      <Progressbar
        progress={progress}
        color={'lightblue'}
      />

      <Progressbar
        progress={progress}
        color={'yellow'}
      />
    </div>
  )
}

export default App