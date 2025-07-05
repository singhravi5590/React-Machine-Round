import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [food, setFood] = useState(' ');
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  function handleInput(e){
    setFood(e.target.value);
  }

  async function fetchItems(){
    try {
    const url = `https://api.frontendeval.com/fake/food/${food}`;  
    const result = await fetch(url);
    const data = await result.json();
    setShoppingList(data)
    } 
    catch (error) {
      
    }
  }

  function handleDelete(id){
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.filter((item) => item.id != id);
    setBucketList(newBucketList)
  }

  function handleRightClick(id){
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if(item.id == id){
        item.isDone = !item.isDone
      }
      return item
    })
    setBucketList(newBucketList)
  }

  function handleShopping(e){
    const idx = e.target.getAttribute('data-id');
    if(idx){
      const obj = {
        id : Date.now(),
        data : shoppingList[idx],
        isDone : false
      }
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }

    setFood('')
  }

  console.log(bucketList);
  

  useEffect(() => {
    if(food.length > 2){
      fetchItems()
    }
  }, [food])

  return (
    <div className='app'>
      <h1>My Shopping List</h1>
      <div>
        <input type="text" value={food} onChange={handleInput}/>
      </div>

      {
        food.length >= 2 ? <div className='shopping-list' onClick={handleShopping}>
        {
         shoppingList.map((item, index) => {
           return (
             <div data-id={index} className='product' key={item+'b'}>
               {item}
             </div>
           )
         })
        }
       </div> : null
      }

      

      <div className='bucket'>
       {
        bucketList.map((item) => {
          return (
            <div className='shopping-item'>
              <button onClick={() => handleRightClick(item.id)}>✓</button>
              <div className={item.isDone && 'strike' } >{item.data}</div>
              <button onClick={() => handleDelete(item.id)} >X</button>
            </div>
          )
        })
       }
      </div>
    </div>
  )
}

export default App