import { useState, useEffect } from 'react'
import Register from './Register'
import Login from './Login'



const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Axios Auth</h1>
      <Login />
    </>
  )
}

export default App
