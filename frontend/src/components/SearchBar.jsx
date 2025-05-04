// components/SearchBar.js
import React, { useContext, useState } from 'react'
import { FilterContext } from '../context/FilterContext'
import { useNavigate } from 'react-router-dom';
import apiRequest from '../lib/apiRequest.js';


const SearchBar = () => {
 
  const {updateFilterData} = useContext(FilterContext);

  const navigate = useNavigate();

  const [type, setType] = useState("BUY"); // default type is Buy

  const [error, setError] = useState("")

  const handleSubmit = async(e)=>{
   e.preventDefault();
   const formData = new FormData(e.target);
   formData.append("type", type);
   const data =  Object.fromEntries(formData);
   console.log(data);

   try {
    const res = await apiRequest.get('/post/getPosts',{
      params:data
    })
    console.log(res.data.data);
    updateFilterData(res.data.data);
    navigate('/list');
    //updae hoga ab list me leke card me show karns ha
    
   } catch (error) {
    console.log(error);
    setError(error);
   }


  }



  return (
    <form  
    onSubmit={handleSubmit}
    
    >
    <div className='w-full md:w-4/5 lg:w-3/4 bg-white rounded-lg shadow-md p-4 md:p-6'>
      <div className='flex space-x-2 mb-4'>
        <button 
        type="button"
        onClick={()=>setType("BUY")}
        className={`h-10 md:h-12 px-4 md:px-6 

          ${type==="BUY" ?"bg-amber-500":"bg-gray-500"} 
           text-white rounded-md font-semibold hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1`}
        >
          Buy
        </button>


        <button 
        type="button"
        onClick={()=>setType("RENT")}
        className={`h-10 md:h-12 px-4 md:px-6 
          ${type==="RENT" ?"bg-amber-500":"bg-gray-500"} text-white  rounded-md font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1`}
        >    
          Rent
        </button>


      </div>
      <div className='flex flex-col md:flex-row rounded-md shadow-sm'>
        <div className='relative flex-grow focus-within:z-10 mb-2 md:mb-0 md:mr-2'>
          <input
            type='text'
            name='city'
            className='block w-full h-10 md:h-12 pl-3 pr-3 sm:text-sm border-gray-300 rounded-md md:rounded-l-md focus:outline-none focus:ring-amber-500 focus:border-amber-500'
            placeholder='City, Location'
          />
        </div>
        <div className='relative flex-grow focus-within:z-10 mb-2 md:mb-0 md:mr-2'>
          <input
            type='Number'
            name='minPrice'
            min={0}
            max={100000}
            className='block w-full h-10 md:h-12 pl-3 pr-3 sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500'
            placeholder='Min Price'
          />
        </div>
        <div className='relative flex-grow focus-within:z-10 mb-2 md:mb-0 md:mr-2'>
          <input
            type='Number'
            name='maxPrice'
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

        
          {/* Error display */}

      </div>
          {error && <span className="text-red-500 text-sm">error </span>  }
    </div>
    </form>
  )
}

export default SearchBar