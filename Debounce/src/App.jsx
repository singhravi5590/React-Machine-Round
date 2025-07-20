import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  async function fetchSearch(){
    try {
      const url = `https://api.frontendeval.com/fake/food/${input}`;
      let res = await fetch(url);
      let data = await res.json();
      setList(data)
    } 
    catch (error) {
      console.log(error);
    }
  }

  function handleChange(e){
    if(list.length > 0){
      setList([]);
    }
    setInput(e.target.value);
  }

  useEffect(() => {
    let time;
    if(input.length > 2){
      time = setTimeout(() => {
        fetchSearch();
      }, 2000)
    }

    return () => {
      clearInterval(time);
    }
  }, [input])

  return (
    <div className='App'>
      <h1 className='main-text'>Search Bar</h1>
      <input className='input' value={input} onChange={handleChange} type="text" />
      
      {list.length > 0 && <div className='list-container'>
        {
          list.map((item, index) => (
            <div className='list-items' key={index}>{item}</div>
          ))
        }
      </div>}
    </div>
  )
}

export default App