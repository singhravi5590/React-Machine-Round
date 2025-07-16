import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(null))
  const [isTurn, setIsTurn] = useState(true);
  const [won, setWon] = useState(null);

  function handleUserClick(e){
    if(won || matrix[e.target.id] !== null) return;


    let pos = e.target.id;
    const copyMatrix = [...matrix];
    copyMatrix[pos] = isTurn ? 'X' : 'O';
    setMatrix(copyMatrix);
    setIsTurn((prev) => !prev);
  }

  function decideWinner(){
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for(let i = 0; i < line.length; i++){
      const [a, b, c] = line[i];
      if(matrix[a] == matrix[b] && matrix[b] == matrix[c]){
        setWon(matrix[a]);
      }
    }
  }

  function handleReset(){
    setMatrix(Array(9).fill(null))
    setWon(null)
    setIsTurn(true);
  }

  useEffect(() => {
    decideWinner();
  }, [matrix])


  return (
   <div className='App'>
    <h1>Tic Tac Toe</h1>
    <div onClick={handleUserClick} className='board'>
      {
        matrix.map((item, index) => (
          <div key={index} id={index} className='box'>{item}</div>
        ))
      }
    </div>
    <div className='game-info'>
      <button onClick={handleReset}>Reset</button>
      <div>Next Player : {isTurn ? 'X' : 'O'}</div>
      {won && <div>Player {won} Won The Game</div>}
    </div>
   </div>
  )
}

export default App
