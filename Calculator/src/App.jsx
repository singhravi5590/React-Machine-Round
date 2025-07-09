import React, { useState } from 'react'
import './App.css'

const App = () => {

  const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '/', '*', '=', 'C', '.']
  const [value, setValue] = useState('');

  function handleChange(e){
    setValue(e.target.value);
  }

  function handleOnclick(e){
    const id = e.target.id;
    if(id === 'C'){
      setValue('');
    }else if(id === '='){
      handleSubmit()
    }else {
      setValue((val) => val + id)
    }
  }

  function handleSubmit(e){
    e?.preventDefault();
    try {
      const ans = eval(value);
      setValue(ans);  
    } 
    catch (error) {
      alert("Invalid Message");
    }
  }

  return (
    <div className='App'>
      <h1>Calculator</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={value}  onChange={handleChange}/>
      </form>
      <div className='container' onClick={handleOnclick}>
        {
          arr.map((item, idx) => (
            <button id={item} key={idx} className='cell' >{item}</button>
          ))
        }
      </div>
    </div>
  )
}

export default App