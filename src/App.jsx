import { useState, useEffect } from 'react'
import axios from 'axios'

const Register = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [pwd, setPwd] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    axios.post("http://127.0.0.1:8000/api/cabins/",
        JSON.stringify({ 
          name: "cors"
          // email: "manuel@amazon.com",
          // username: "manuel",
          // password: "13angulo" 
        }),
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true
        }
    ).then(res => console.log(res.data))
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input 
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          type='text'
          placeholder='Password'
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Axios Auth</h1>
      <Register />
    </>
  )
}

export default App
