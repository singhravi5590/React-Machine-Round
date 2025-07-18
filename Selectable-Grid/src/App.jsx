import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [twoDMatrix, setTwoDMatrix] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);

  function prepareTwoDMatrix(){
    const matrix = [];
    for(let i = 0; i<=9; i++){
      for(let j = 0; j<=9; j++){
        const obj = {
          pos : [i, j],
          isColor : false,
        }
        matrix.push(obj);
      }
    }
    setTwoDMatrix(matrix);
  }

  function handleDrag(e, pos){
    setStart(pos)
    prepareTwoDMatrix();
  }

  function handleDragOver(e, pos){
    setEnd(pos)
  }

  function fillColor(start, end){
    const [startRow, startColumn] = start;
    const [endRow, endColumn] = end;
    const selectedGrid = [];
    for(let i = startRow; i <= endRow; i++){
      for(let j = startColumn; j<=endColumn; j++){
        selectedGrid.push([i,j].join(""));
      }
    }
    let copyMat = [...twoDMatrix];
    copyMat = copyMat.map((item) => {
      const {pos} = item;
      const stringPos = pos.join('');
      if(selectedGrid.includes(stringPos)){
        item.isColor = true;
      }
      return item;
    })
    setTwoDMatrix(copyMat)
  }

  useEffect(() => {
    prepareTwoDMatrix();
  }, [])

  useEffect(() => {
    if(start.length > 1 && end.length > 1){
      fillColor(start, end);
    }
  }, [start, end])

  

  return(
    <div className="App">
      <h1>Selectable Grid</h1>
      <div className="grid">
        <div className="board">
          {
            twoDMatrix.map((item, i) => (
              <div 
                key={i} 
                draggable 
                onDrag={(e) => handleDrag(e, item.pos)}  className={`cell ${item.isColor && `selected-cell`}`}
                onDragOver={(e) => handleDragOver(e, item.pos)}>
                {item.pos}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
