import React, { useState } from 'react'
import './App.css'

const App = () => {

  const [value, setValue] = useState(0);
  const [redoList, setRedoList] = useState([]);
  const [history, setHistory] = useState([]);
  const [undoCount, setUndoCount] = useState(0);

  function manageHistory(action, prev, curr){
    const obj = {
      action,
      prev,
      curr
    }
    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  }

  function handleClick(key){
    let val = parseInt(key);
    manageHistory(key, value, val+value)
    setValue((prev) => prev+val)
  }

  function handleUndo(){
    if(history.length){
      if(undoCount + 1 < 5){
        const copyHist = [...history];
        const firstItem = copyHist.shift();
        setHistory(copyHist);
  
        setValue(firstItem.prev)
  
        const copyRedoList = [...redoList];
        copyRedoList.push(firstItem);
        setRedoList(copyRedoList);
      }
    }
  }

  function handleRedo(){
    if(redoList.length){
      const copyRedoList = [...redoList];
      const poppedValue = copyRedoList.pop();
      setRedoList(copyRedoList)
      const {action, prev, curr} = poppedValue;
      setValue(curr);
      manageHistory(action, prev, curr)
    }
  }

  return (
    <div className='container'>
      <h1>Undoable Counter</h1>
      <div className='action-btn'>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      <div className='user-action'>
        {
          [-100, -10, -1].map((btn) => (
            <button key={btn} onClick={()=> handleClick(btn)}>{btn}</button>
          ))
        }

        <div style={{fontSize: 40, marginInline : 10}}>{value}</div>

        {
          ['+100', '+10', '+1'].map((btn) => (
            <button key={btn} onClick={()=> handleClick(btn)}>{btn}</button>
          ))
        }
      </div>

      <div className='history'>
        {
          history.map((item) => {
            return <div className='row'>
              <div>{item.action}</div>
              <div>
                {
                  `[${item.prev} --> ${item.curr}]`
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App