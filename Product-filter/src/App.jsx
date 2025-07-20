import { useEffect, useState } from 'react';
import './App.css'
import {items} from './item.js'

function App() {
  const filters = ['Bags', 'Watches', 'Sports', 'Sunglasses'];
  const [filteredItems, setFilteredItems] = useState(items);
  const [activeFilters, setActiveFilters] = useState([]);


  function handleClick(e){
    const category = e.target.id;
    if(activeFilters.includes(category)){
      let filter = activeFilters.filter((item) => item != category);
      setActiveFilters(filter);
    }
    else{
      setActiveFilters([...activeFilters, category])
    }
  }

  function fetchFilterItems(){
    if(activeFilters.length > 0){
      let temp = items.filter((items) => activeFilters.includes(items.category));
      setFilteredItems(temp);
    }
    else{
      setFilteredItems(items);
    }
  }

  useEffect(() => {
    fetchFilterItems()
  }, [activeFilters])

  return (
    <>
    <div className="App">
      <h1>Filter Product</h1>
      <div onClick={handleClick} className='filter-button' >
        {
          filters.map((item, idx) => (
            <button key={idx} className={activeFilters.includes(item) ? 'selected' : ''} id={item}>{item}</button>
          ))
        }
      </div>
        <div className='product'>
          {
            filteredItems.map((item, index) => (
              <div key={index} className='item'>
                <p>{item.name}</p>
                <p className='category'>{item.category}</p>
              </div>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default App
