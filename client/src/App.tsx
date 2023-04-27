import  react  from 'react'
import Home from './pages/Home'
import {Routes,Route}from "react-router-dom"
import AddUser from './pages/AddUser'
import Documents from './pages/Documents'

import Profile from './pages/Profile'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/adduser" element={<AddUser/>}/>
      <Route path="/profile/:userId" element={<Profile/>}/>
      <Route path="/profile/documents/:userId" element={<Documents/>}/>
    </Routes>
    
  )
}

export default App;