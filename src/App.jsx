import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Layout from './components/Layout'
import LinkPage from './components/LinkPage'
import Unauthorized from './components/Unauthorized'
import Home from './components/Home'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Lounge from './components/Lounge'
import Missing from './components/Missing'
import RequireAuth from './components/RequireAuth'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      {/* Public Routes */}
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
        <Route path='linkpage' element={<LinkPage />}/>
        <Route path='unauthorized' element={<Unauthorized />}/>
      {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />}/>
          <Route path='editor' element={<Editor />}/>
          <Route path='Admin' element={<Admin />}/>
          <Route path='lounge' element={<Lounge />}/>
        </Route>
      {/* Catch all */}
        <Route path='*' element={<Missing />}/>
      </Route>
    </Routes>
  )
}

export default App
