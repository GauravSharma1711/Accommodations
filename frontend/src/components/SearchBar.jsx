// components/SearchBar.js
import React, { useState } from 'react'


const SearchBar = () => {
  const [query, setQuery] = useState({
    type:"Buy",
    location:"",
    minPrice:0,
    maxPrice:0,
  })
  return (
    <div className='w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg shadow-md p-4 md:p-6'>
      <div className='flex space-x-2 mb-4'>
        <button 
        className={`h-10 md:h-12 px-4 md:px-6 ${query.type==="Buy" ?"bg-amber-500":"bg-gray-500"}  text-white rounded-md font-semibold hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1`}
        onClick={()=> setQuery(prev =>({...prev,type:"Buy"}))}
        >
          Buy
        </button>
        <button 
        className={`h-10 md:h-12 px-4 md:px-6 ${query.type==="Rent" ?"bg-amber-500":"bg-gray-500"} text-white  rounded-md font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1`}
        
        onClick={()=> setQuery(prev =>({...prev,type:"Rent"}))}
        >
          
          Rent
        </button>
      </div>
      <div className='flex flex-col md:flex-row rounded-md shadow-sm'>
        <div className='relative flex-grow focus-within:z-10 mb-2 md:mb-0 md:mr-2'>
          <input
            type='text'
            className='block w-full h-10 md:h-12 pl-3 pr-3 sm:text-sm border-gray-300 rounded-md md:rounded-l-md focus:outline-none focus:ring-amber-500 focus:border-amber-500'
            placeholder='City, Location'
          />
        </div>
        <div className='relative flex-grow focus-within:z-10 mb-2 md:mb-0 md:mr-2'>
          <input
            type='Number'
            min={0}
            max={100000}
            className='block w-full h-10 md:h-12 pl-3 pr-3 sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500'
            placeholder='Min Price'
          />
        </div>
        <div className='relative flex-grow focus-within:z-10 mb-2 md:mb-0 md:mr-2'>
          <input
            type='Number'
            min={0}
            max={100000}
            className='block w-full h-10 md:h-12 pl-3 pr-3 sm:text-sm border border-gray-300 rounded-md md:rounded-r-md focus:outline-none focus:ring-amber-500 focus:border-amber-500'
            placeholder='Max Price'
          />
        </div>
        <button
          className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1'
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar