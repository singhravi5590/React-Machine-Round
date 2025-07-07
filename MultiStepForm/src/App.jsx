import React, { useState } from 'react'
import './App.css'

const App = () => {

  const data = [
    {
      id : "name",
      label : "Name",
      inputType : "text",
      buttonName : "Next",
      placeholder : "Your Name ...."
    },
    {
      id : "email",
      label : "Email",
      inputType : "email",
      buttonName : "Next",
      placeholder : "Your email ...."
    },
    {
      id : "dob",
      label : "DOB",
      inputType : "date",
      buttonName : "Next",
      placeholder : ""
    },
    {
      id : "password",
      label : "Password",
      inputType : "password",
      buttonName : "Submit",
      placeholder : "Your Password ...."
    }
  ]

  const [forms, setForms] = useState(data);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name : "",
    email : "",
    dob : "",
    password : ""
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function handleform(e){
    e.preventDefault();
    if(index === forms.length - 1){
      console.log("Form Submitted");
      setIsFormSubmitted(true)
    }
    else{
      setIndex((prev) => prev+1);
    }
  }

  function handleBack(e){
    e.preventDefault();
    setIndex((prev) => prev-1);
  }

  function handleChange(e){
    const {id, value} = e.target;
    console.log(id);
    console.log(value);
    
    setFormData((prev) => {
      return {
        ...prev,
        [id] : value
      }
    })
  }

  console.log(formData);
  
  

  return (
    <div className='App'>
      { !isFormSubmitted ? 
      <form className='container' onSubmit={handleform} action="">
        {
          index > 0 && 
            <a onClick={handleBack} href="">Back</a>
        }
        <label htmlFor="">{forms[index].label}</label>
        <input id={forms[index].id} value={formData[forms[index].id]} onChange={handleChange} type={forms[index].inputType} placeholder={forms[index].placeholder}/>
        <button >{forms[index].buttonName}</button>
      </form>
  :
      <div>
        <h1>Success</h1>
        <div>
          <span>Name : {formData.name}</span>
          <br />
          <span>Email : {formData.email}</span>
          <br />
          <span>DOB : {formData.dob}</span>
          <br />
          <span>Password : {formData.password}</span>
          <br />
        </div>
      </div>
      }
    </div>
  )
}

export default App