import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item}) => {
  return (
    <div className='flex flex-col sm:flex-row gap-6 rounded-md mb-4 shadow-md overflow-hidden'>
      <div className='w-full sm:w-1/3'>
        <Link to={`/${item._id}`}>
          <img src={item.images[0]} className='w-full h-48 object-cover rounded-t-md sm:rounded-l-md sm:rounded-t-none' alt={item.title} />
        </Link>
      </div>

      <div className='flex flex-col justify-between p-4 w-full sm:w-2/3'>
        <div>
          <h2 className='text-xl font-semibold mb-2'>
            <Link to={`/${item._id}`} className='hover:underline'>
              {item.title}
            </Link>
          </h2>
          <p className='text-gray-600 text-sm mb-2 flex items-center gap-1'>
            <img src='/pin.png' className='w-4 h-4' alt='Location' />
            <span>{item.address}</span>
          </p>
          <p className='text-amber-500 font-semibold text-lg mb-3'>${item.price}</p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 md:gap-6 items-center text-gray-700 text-sm'>
          <div className='flex items-center gap-2'>
            <img src='/bed.png' className='w-5 h-5' alt='Bedroom' />
            <span>{item.bedroom} bedroom</span>
          </div>
          <div className='flex items-center gap-2'>
            <img src='/bath.png' className='w-5 h-5' alt='Bathroom' />
            <span>{item.bathroom} bathroom</span>
          </div>
          <div className='flex items-center gap-2 mt-2 md:mt-0'>
            <div className='flex items-center gap-1'>
              <img src='/save.png' className='w-5 h-5' alt='Save' />
            </div>
            <div className='flex items-center gap-1'>
              <img src='/chat.png' className='w-5 h-5' alt='Chat' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;