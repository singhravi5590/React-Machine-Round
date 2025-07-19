import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const arr = ['usd', 'eur', 'gbp', 'cny', 'jpy'];
  const [currency, setCurrency] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [convertedCurr, setConvertedCurr] = useState();
  const [diff, setDiff] = useState(0);
  const [isUp, setIsUp] = useState(true);

  function handleOnChange(e){
    setCurrency(e.target.value);
  }

  function handleCurrencyType(e){
    setSelectedCurrency(e.target.value)
  }

  async function fetchCurrencyInfo(){
    try {
      const url = `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`  
      const res = await fetch(url);
      const data = await res.json();
      const val = data.value;
      const showCurr = currency * val;
      setConvertedCurr(showCurr);
      const preVal = window.sessionStorage.getItem('prevVal');
      const diff = showCurr.toFixed(2) - preVal;
      diff < 0 ? setIsUp(false) : setIsUp(true);
      setDiff(diff.toFixed(2));

      window.sessionStorage.setItem('prevVal', showCurr.toFixed());
    } 
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo()
    }, 3000)

    return () => {
      clearInterval(time)
    }
  },[currency, selectedCurrency])

  
  return (
   <>
    <div className='App'>
      <h1>Crypto Converter</h1>
      <div className="wrapper">
        <input type="number" value={currency} onChange={handleOnChange}/>

        <select onChange={handleCurrencyType} name="currency">
         {
          arr.map((curr) => (
            <option key={curr} value={curr}>{curr.toUpperCase()}</option>
          ))
         }
        </select>
      </div>

      <div className='curr-info'>
        <div>{convertedCurr?.toFixed(2)}</div>
        <div>WUC</div>
        <div className={isUp ? 'green' : 'red'}>
          <span>{isUp
           ? '↑' : '↓'}</span>
         <span>{diff}</span>
        </div>
      </div>
    </div>
   </>
  )
}

export default App
