import { useState } from 'react'
import './App.css'

function App() {
  const defaultValue = {
    firstName : {
      id : 'firstName',
      label : 'First Name',
      type : 'text',
      placeholder : 'First Name ...',
      value : '',
      isError : false,
      errorMsg : "First Name can't be empty",
    },
    lastName : {
      id : 'lastName',
      label : 'Last Name',
      type : 'text',
      placeholder : 'Last Name ...',
      value : '',
      isError : false,
      errorMsg : "Last Name can't be empty",
    },
    email : {
      id : 'email',
      label : 'Email',
      type : 'text',
      placeholder : 'Email ...',
      value : '',
      isError : false,
      errorMsg : "email can't be empty",
    },
    password : {
      id : 'password',
      label : 'Password',
      type : 'text',
      placeholder : 'Password ...',
      value : '',
      isError : false,
      errorMsg : "Password can't be empty",
    },
    confirmPassword : {
      id : 'confirmPassword',
      label : 'Confirm Password',
      type : 'text',
      placeholder : 'Confirm Password ...',
      value : '',
      isError : false,
      errorMsg : "Confirm Password can't be empty",
    }
  }

  const [formData, setFormData] = useState(defaultValue);
  const [isPassMatch, setIsPassMatch] = useState(true)

  function handleChange(e){
    let id = e.target.id;
    let value = e.target.value;

    const copyData = {...formData};
    copyData[id].value = value;
    setFormData(copyData);
    isValidForm();
  }

  function passwordMatch(){
    const copyFormData = {...formData};
    const pass = copyFormData['password'].value;
    const confirmPassword = copyFormData['confirmPassword'].value;
    if(pass === confirmPassword){
      setIsPassMatch(true);
    }
    else{
      setIsPassMatch(false)
    }
  }

  function isValidForm(){
    const copyFormData = {...formData};
    Object.keys(copyFormData).forEach(key => {
      const obj = copyFormData[key];
      obj.isError = obj.value ? false : true;
      passwordMatch();
    })

    setFormData(copyFormData);
  }

  function handleSubmit(e){
    e.preventDefault();
    isValidForm();
    console.log(formData)
  }



  return (
    <div className='App'>
      <div className="container">
        <form onSubmit={handleSubmit} action="">
          {
            Object.keys(formData).map((key) => {
              const {id, label, type, placeholder, value, isError, errorMsg} = formData[key];
              return (
                <div key={id} className="form-item">
                  <label htmlFor="">{label}</label>
                  <input 
                    onChange={handleChange}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    id={id}
                  />
                  {
                    isError && <span>{errorMsg}</span>
                  }
                  {
                    key === 'confirmPassword' && !isPassMatch && 
                    <span>
                      Password does Not Match
                    </span>
                  }
                </div>
              )
            })
          }
          <div className='form-item'>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
