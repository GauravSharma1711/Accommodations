import React from 'react';

const Filter = () => {
  const inputClass =
    'p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className='flex flex-col gap-4 rounded-md shadow-md p-4'>
      <h1 className='text-xl font-semibold'>Search Result</h1>

      <div>
        <label htmlFor='city' className='block text-gray-700 text-sm font-bold mb-2'>
          Location
        </label>
        <input
          className={`${inputClass} w-full`}
          type='text'
          id='city'
          name='city'
          placeholder='City Location'
        />
      </div>

      <div className='flex flex-wrap gap-2'>
        <div>
          <label htmlFor='type' className='block text-gray-700 text-sm font-bold mb-2'>
            Type
          </label>
          <select className={`${inputClass} w-full sm:w-[120px]`} name='type' id='type'>
            <option value='buy'>Buy</option>
            <option value='rent'>Rent</option>
          </select>
        </div>

        <div>
          <label htmlFor='property' className='block text-gray-700 text-sm font-bold mb-2'>
            Property
          </label>
          <select className={`${inputClass} w-full sm:w-[120px]`} name='property' id='property'>
            <option value='apartment'>Apartment</option>
            <option value='house'>House</option>
          </select>
        </div>

        <div>
          <label htmlFor='minPrice' className='block text-gray-700 text-sm font-bold mb-2'>
            Min Price
          </label>
          <input
            className={`${inputClass} w-full sm:w-[120px]`}
            type='number'
            id='minPrice'
            name='minPrice'
            placeholder='Min Price'
          />
        </div>

        <div>
          <label htmlFor='maxPrice' className='block text-gray-700 text-sm font-bold mb-2'>
            Max Price
          </label>
          <input
            className={`${inputClass} w-full sm:w-[120px]`}
            type='number'
            id='maxPrice'
            name='maxPrice'
            placeholder='Max Price'
          />
        </div>

        <div>
          <label htmlFor='bedroom' className='block text-gray-700 text-sm font-bold mb-2'>
            Bedroom
          </label>
          <input
            className={`${inputClass} w-full sm:w-[120px]`}
            type='number'
            id='bedroom'
            name='bedroom'
            placeholder='Bedroom'
          />
        </div>
      </div>
      <button className='w-full sm:w-[120px] p-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 font-semibold'>
        Search
      </button>
    </div>
  );
};

export default Filter;