import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:8000/userForm', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type':'application/json'
      }
    })
    return await response.json();
  
  }

  const getUser = async() =>{
    const response =  await fetch('http://localhost:8000/userForm',{
      method: 'GET'
    })
    
    const data = await response.json();
    setUsers(data);
  }

  useEffect(()=>{
    getUser();
  },[users])
  
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <span>userName</span>
        <input type='text' name='username' onChange={handleForm}/>
        <span>password</span>
        <input type='text' name='password'  onChange={handleForm}/>
        <input type='submit'/>
      </form>
      <div>
        <ul>
          {users.map(user=><li key={user._id}>{user.username}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
