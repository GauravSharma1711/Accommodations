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
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import ProfileUpdate from './pages/ProfileUpdate'
import NewPostPage from './pages/NewPostPage'
import { singlePageLoader } from './lib/loaders.js'

const App = () => {
  return (
    <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' >
      <Navbar />
      <Routes>
<Route path="/" element={<HomePage/>} />
<Route path="/list" element={<ListPage/>} />
<Route path="/signup" element={<SignUpPage/>} />
<Route path="/login" element={<LoginPage/>} />

<Route path="/:id" element={
  <PrivateRoute>
    <SinglePage/>
    {/* loader: SinglePageLoader */}
  </PrivateRoute>
}/>

<Route path="/profile" element={
 <PrivateRoute>
 <Profile />
</PrivateRoute>
} />
<Route path="/updateProfile/:id" element={<ProfileUpdate />} />

<Route path="/add" element={<NewPostPage />} />

      </Routes>
    </div>
  )
}

export default App