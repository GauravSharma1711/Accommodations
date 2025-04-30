// pages/HomePage.js
import React from 'react'
import SearchBar from '../components/SearchBar'

const HomePage = () => {
  return (
    <div className='min-h-[calc(100vh-100px)] flex flex-col lg:flex-row'>
      <div className='w-full lg:w-2/3 p-6 md:p-12 font-bold leading-relaxed flex flex-col justify-center items-start'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4'>
          Find Homes & Get Your Dream Place
        </h1>
        <p className='text-lg md:text-xl font-semibold text-gray-700 mb-8'>
          Discover a wide range of properties for sale and rent. Our advanced search tools will help you find the perfect home.
        </p>
        <SearchBar />
      </div>
      <div className='w-full lg:w-1/3 bg-[rgb(252,245,243)] flex items-center justify-center overflow-hidden'>
        <img src="/bg.png" alt="Modern Home" className='object-cover w-full h-full' />
      </div>
    </div>
  )
}

export default HomePage