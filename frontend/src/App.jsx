// App.js
import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div
      className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    >
      <Navbar />
      <HomePage />
    </div>
  )
}

export default App