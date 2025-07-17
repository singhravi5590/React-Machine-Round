import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [images, setImages] = useState([]);

  async function fetchImages(index){
    try {
      const url =  `https://picsum.photos/v2/list?page=${index}&limit=9`


      const result = await fetch(url);
      const data = await result.json();
      return data;
    } 
    catch (error) {
      console.log(error);
    }
  }

  async function fetchFirstPage(){
    const data = await fetchImages(1);
    setImages(data);
  }

  useEffect(() => {
    fetchFirstPage()
  }, [])

  console.log(images)
  return (
    <div className='App'>
      <h1>Infinite Scrolling</h1>
      {
        images?.map((image, index) => {
          return (
            <img src={image.url} key={index} alt="hello" />
          )
        })
      }
    </div>
  )
}

export default App