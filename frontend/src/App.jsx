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
import AiForm from './pages/AiForm'
import Users from './pages/Users'
import ChatPage from './pages/ChatPage'
// import { singlePageLoader } from './lib/loaders.js'
import Layout from './components/Layout'
import NotificationsPage from './pages/NotificationsPage'

import {Toaster} from 'react-hot-toast'

import 'stream-chat-react/dist/css/v2/index.css'; 


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


<Route path='/agent' element={<AiForm/>} />

{/* ------------ */}

<Route
 path='/users'
  element={
    <Layout showSidebar={true}>
  <Users/>
    </Layout>
  } />


 <Route
          path="/notifications"
          element={
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            
          }
        />

<Route path='/chat/:id' 
element={
  <Layout showSidebar={false}>
      <ChatPage/>
    </Layout>
} />


      </Routes>
      <Toaster/>
    </div>
  )
}

export default App