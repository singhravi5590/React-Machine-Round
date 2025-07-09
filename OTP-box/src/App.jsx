import React from 'react'
import './App.css'
import { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {

  const refs = [useRef(), useRef(), useRef(), useRef()];
  const emptyArray = ["", "", "", ""];
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [missing, setMissing] = useState(emptyArray);
  const code = '1234';

  function handleInputChange(e, index){
    if(!Number(e.target.value)){
      return
    }
    if(index < inputs.length - 1){
      refs[index + 1].current.focus();
    }
    const copyInputs = [...inputs];
    copyInputs[index] = e.target.value;
    setInputs(copyInputs);
  }

  function handleKeyDown(e, index){
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = '';
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  }

  function handleSubmit(){
    const missed = inputs.map((item, i) => {
      if(item === ""){
        return i;
      }
    }).filter((item) => (item || item === 0));
    setMissing(missed);

    if(missed.length < 4){
      return alert("Please enter")
    }

    const userInput = inputs.join("");
    const isMatch = userInput === code;
    const msg = isMatch ? 'Code is Valid' : 'Code is not valid';
    alert(msg)
  }

  function handlePaste(e){
    const data = e.clipboardData.getData('text');
    if(!Number(data) || data.length !== inputs.length){
      return ;
    }
    const pasteCode = data.split("");
    setInputs(pasteCode);
    refs[inputs.length - 1].current.focus();
  }
  
  useEffect(() => {
    refs[0].current.focus();
  }, [])

  return (
    <div className='App'>
      <h1>Two-Factor Code Input </h1>
      <div className='input-box'> 
        {
          Array(4).fill("").map((item, index) => {
            return (
              <input 
                key={index} 
                value={inputs[index]} 
                ref={refs[index]} 
                type='text' 
                onChange={(e) => handleInputChange(e, index)}
                onPaste={handlePaste} onKeyDown={(e) => handleKeyDown(e, index)} 
                maxLength={1}
                className={missing.includes(index) ? 'error' : ""}
              />
            )
          })
        }
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App