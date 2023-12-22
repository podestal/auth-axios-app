import { useState, useEffect } from 'react'
import axios from 'axios'

const Register = () => {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [pwd, setPwd] = useState("")
  const [confPwd, setConfPwd] = useState("")
  const [pwdErr, setPwdErr] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    if (pwd === confPwd) {
      setPwdErr("")
      axios.post("http://127.0.0.1:8000/auth/users/",
        JSON.stringify({ 
          email,
          username,
          password: pwd
        }),
        {
          headers: {'Content-Type': 'application/json'}
        }
      ).then(res => console.log(res.data))
    } else {
      setPwdErr("Passwords do not match")
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <h3>{pwdErr}</h3>
        <input 
          type='email'
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
          type='password'
          placeholder='Password'
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
        <input 
          type='password'
          placeholder='Confirm password'
          value={confPwd}
          onChange={e => setConfPwd(e.target.value)}
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
