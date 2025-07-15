import React, { useState } from 'react'
import './App.css'

const App = () => {
  const TODO = 'TODO';
  const DOING = 'DOING';
  const DONE = 'DONE';
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  function handleChange(e){
    setValue(e.target.value);
  }

  function handleKeyDown(e){
    if(e.keyCode === 13){
      if(updateItem){
        const obj = {
          title : value,
          status : updateItem.status,
          id : updateItem.id
        }
        const copyTask = [...tasks];
        const filteredList = copyTask.filter((item) => item.id !== updateItem.id);
        setTasks((prev) => [...filteredList, obj])
        setUpdateItem(null)
      }
      else{
        const obj = {
          title : value,
          status : TODO,
          id : Date.now(),
        }
        setTasks((prev) => [...prev, obj]);
      }
      setValue("");
      
    }
  }

  function handleDrag(e, task){
    setDragTask(task);
  }

  function handlDragNDrop(status){
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if(dragTask.id === item.id){
        item.status = status;
      }
      return item
    })
    setTasks(copyTask);
    setDragTask(null)
  }

  function handleOnDrop(e){
    const status = e.target.getAttribute('data-status');
    if(status === 'TODO'){
      handlDragNDrop(TODO)
    }
    else if(status === 'DOING'){
      handlDragNDrop(DOING)
    }
    else if(status === 'DONE'){
      handlDragNDrop(DONE)
    }
  }

  function onDragOver(e){
    e.preventDefault()
  }

  function deleteTask(item){
    let copyTask = [...tasks];
    copyTask = copyTask.filter((task) => task.id != item.id);
    setTasks(copyTask)
  }

  function updateTask(item){
    setUpdateItem(item);
    setValue(item.title);
  }
    
  return (
    <div className='App'>
      <h1>Task Manager</h1>
      <input 
        type="text" 
        value={value}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
      />
      <div className="board"
        onDrop={handleOnDrop}
        onDragOver={onDragOver}
        data-status={TODO}>
        <div className='todo'>
          <h2 className='todo-col'>Todo</h2>
         {
          tasks.length > 0 && (tasks.map((task) => (
            task.status == 'TODO' && (<div onDrag={(e) => handleDrag(e, task)} draggable key={task.id} className="task-items">
            {task.title}
            <div className="btns">
              <span onClick={() => updateTask(task)} className='btn'>✏️</span>
              <span onClick={(e) => deleteTask(task)} className='btn'>🗑️</span>
            </div>
          </div>)
          )))
         }
        </div>

        <div className='doing'
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          data-status={DOING}
        >
          <h2 className='doing-col'>Doing</h2>
          {
          tasks.length > 0 && (tasks.map((task) => (
            task.status == 'DOING' && (<div onDrag={(e) => handleDrag(e, task)} draggable key={task.id} className="task-items">
            {task.title}
            <div className="btns">
              <span onClick={() => updateTask(task)} className='btn'>✏️</span>
              <span onClick={(e) => deleteTask(task)} className='btn'>🗑️</span>
            </div>
          </div>)
          )))
         }
        </div>

        <div className='done'
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          data-status={DONE}>
          <h2 className='done-col'>Done</h2>
          {
          tasks.length > 0 && (tasks.map((task) => (
            task.status == 'DONE' && (<div onDrag={(e) => handleDrag(e, task)} draggable key={task.id} className="task-items">
            {task.title}
            <div className="btns">
              <span onClick={() => updateTask(task)} className='btn'>✏️</span>
              <span onClick={(e) => deleteTask(task)} className='btn'>🗑️</span>
            </div>
          </div>)
          )))
         }
        </div>
      </div>
    </div>
  )
}

export default App