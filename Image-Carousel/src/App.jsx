import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  async function fetchImage(){
    const url = 'https://www.reddit.com/r/aww/top/.json?t=all';
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data.children;
    const list = data.filter((item) => item.data.url_overridden_by_dest.includes('.jpg')).map((item) => item.data.url_overridden_by_dest)
    setImages(list)
  }
  useEffect(() => {
    fetchImage()
  }, [])

  function handleClick(dir){
    const lastIndex = images.length - 1;
    if(dir === 'left'){
      if(index === 0){
        setIndex(lastIndex)
      }
      else{
        setIndex((prev) => prev - 1);
      }
    } else if(dir == 'right'){
      if(index == lastIndex){
        setIndex(0);
      }
      else{
        setIndex((prev) => prev + 1);
      }
    }
  }

  useEffect(() => {
    let tid = setInterval(() => {
      handleClick('right');
    }, 2000)


    return (() => {
      clearInterval(tid);
    })
  }, [index])

  return (
    <div className='app'>
      <button onClick={() => handleClick('left')}>{"<"}</button>
      <img src={images[index]} alt="not-found" />
      <button onClick={() => handleClick('right')} className='right'>{">"}</button>
    </div>
  )
}

export default App