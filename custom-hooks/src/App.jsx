import React from 'react'
import useLocalStorage from './useLocalStorage'

const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [count, setCount] = useLocalStorage('count', 0);

  function handleTheme(){
    if(theme === 'dark'){
      setTheme('Light')
    }
    else{
      setTheme('dark')
    }
  }

  function handleIncrement(){
    setCount((prev) => prev + 1)
  }

  return (
    <div>
      <h1>Custom Hooks</h1>
      <h1>{theme}</h1>
      <button onClick={handleTheme}>Toggle Theme</button>
      <h2>{count}</h2>
      <button onClick={handleIncrement}>increment Count</button>
    </div>
  )
}

export default App