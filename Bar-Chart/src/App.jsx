import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [frequency, setFrequency] = useState(undefined);
  const [yAxis, setYAxis] = useState([]);

  async function fetchData(){
    const url = 'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new';
    const res = await fetch(url);
    let data = await res.text();
    data = data.split("\n").filter(Boolean)
    const map = {};
    data?.forEach((item) => {
      if(map[item]){
        map[item] = map[item] + 1;
      }
      else{
        map[item] = 1
      }
    })

    setFrequency(map)
  }

  useEffect(() => {
    if(frequency){
      const max = Math.max(...Object.values(frequency))
      const maxVal = Math.ceil(max/10)*10;
      let arr = [];
      for(let i = maxVal/10; i>=0; i--){
        arr.push(i * 10);
      }
      setYAxis(arr);
    }
  }, [frequency])
  


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='App'>
     <div className='container'>
      <div className='box'>
        <div className='box-y-axis' style={{height : `${yAxis && yAxis[0]}%`}}>
          {
            yAxis.map((val, idx) => (
              <div key={idx} >
                <span>{val}</span>
              </div>
            ))
          }
        </div>

          {
            frequency && Object.entries(frequency).map(([key, val]) => (
              <div className='box-x-axis'>
                <div className='graph' style={{ height : `${val}%`}}></div>
                <div className='index'>
                  {key}
                </div>
              </div>
            ))
          }
      </div>
     </div>
    </div>
  )
}

export default App