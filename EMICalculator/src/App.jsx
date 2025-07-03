import React, { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [principale, setPrincipale] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);
  const [emi, setEmi] = useState(0);

  function handleChange(e){
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if(id === 'principale'){
      setPrincipale(value);
    }
    else if(id === 'interest'){
      setInterest(value);
    }
    else{
      setYears(value)
    }
  }

  // P(r(1+r)^n/((1+r)^n)-1)
  function calculateInterest(){
    let r = interest;
    if(principale && r && years){
      r = r / 12 / 100;
      const calcPow = Math.pow(1+r, years * 12)
      const amount = (principale * r * calcPow) / (calcPow - 1);
      setEmi(Math.round(amount));
    }
  }

 

  useEffect(() => {
    calculateInterest()
  }, [principale, years, interest])

  return (
    <div className='loan-calc'>
      <h1>Mortgage Loan</h1>

      <div className='inputes'>
        <p>Principale : </p>
        <input onChange={handleChange} type="number" id='principale'/>
        <p>Interest :</p>
        <input onChange={handleChange} type="number"  id='interest'/>
        <p>Years :</p>
        <input onChange={handleChange} type="number" id='years'/>
      </div>

      <div className='output'>
        <p>Your Emi is {emi}</p>
      </div>

    </div>
  )
}

export default App