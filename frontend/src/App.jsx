// App.js
import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ListPage from './pages/ListPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import SinglePage from './pages/SinglePage'
import { Route,Routes } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
    <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
      <Navbar />
      <Routes>
<Route path="/" element={<HomePage/>} />
<Route path="/list" element={<ListPage/>} />
<Route path="/signup" element={<SignUpPage/>} />
<Route path="/login" element={<LoginPage/>} />
{/* <Route path="/:id" element={<SinglePage/>} /> */}
<Route path="/s" element={<SinglePage/>} />
      </Routes>
    </div>
  )
}

export default App