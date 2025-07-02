import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [hour, setHour] = useState(0);
  const [timerId, setTimerId] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function handleStart(){
    if(hour < 0 || minutes < 0 || (hour > 0 && minutes >= 0 && seconds == 0)){
      alert("invalid input")
    }
    else{
      setIsStart(true);
    }
  }

  function handleResume(){
    setIsPause(false);
    runTime(hour, minutes, seconds)
  }

  function handlePause(){
    setIsPause(true);
    clearInterval(timerId);
  }

  function handleReset(){
    setIsStart(false);
    setHour(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  }

  function handleInput(e){
    const value = parseInt(e.target.value);
    if(e.target.id === 'hour'){
      setHour(value)
    }
    else if(e.target.id === 'minutes'){
      setMinutes(value)
    }
    else if(e.target.id === 'second'){
      setSeconds(value)
    }
  }

  function runTime(hours, minutes, seconds, tid ){
    if(seconds > 0){
      setSeconds((sec) => sec - 1);
    }
    else if(seconds === 0 && minutes > 0){
      
      setMinutes((min) => min - 1);
      setSeconds(59);
    }
    else{
      setHour((hr) => hr - 1);
      setMinutes(59)
      setSeconds(59);
    }

    if(seconds === 0 && minutes === 0 && hour === 0){
      setHour(0);
      setMinutes(0);
      setSeconds(0);
      clearInterval(tid);
      alert("Timer is finished");
    }

  }

  useEffect(() => {
    let timerId;
    if(isStart){
      timerId = setInterval(() => {
        runTime(hour, minutes, seconds, timerId)
      }, 1000)
      setTimerId(timerId)
    }

    return () => {
      clearInterval(timerId);
    }

  }, [isStart, hour, minutes, seconds])
  

  return ( !isStart ?

     (<div className='container'>
      <h1>Countdown Timer</h1>
      <div className='input-container'>
        <div className='input-box'>
          <input type="number" onChange={handleInput} value={hour} id='hour' placeholder='HH'/>
          <input type="number" onChange={handleInput} value={minutes} id='minutes' placeholder='MM'/>
          <input type="number" onChange={handleInput} value={seconds} id='second' placeholder='SS'/>
        </div>
        <button onClick={handleStart} className='timer-button'>Start</button>
      </div>
     </div>)

    :

     (<div className='show-container'>
       <h1>Countdown Timer</h1>
      <div className='timer-box'>
        <div>{hour < 10 ? `0${hour}` : hour}</div>
        <span>:</span>
        <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
        <span>:</span>
        <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
      </div>
      <div className='action-box'>

        {
          !isPause ? (
            <button onClick={handlePause} className='timer-button'>Pause</button>
          ):
          <button onClick={handleResume} className='timer-button'>Resume</button>
        }
        
        <button onClick={() => setIsStart(!isStart)} className='timer-button'>Reset</button>
      </div>
     </div>)
  )
}

export default App
