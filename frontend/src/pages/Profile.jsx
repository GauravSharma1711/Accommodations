import React from 'react';
import { userData, listData } from '../lib/dummy.js';
import Card from '../components/Card'; // Assuming you have a Card component

const Profile = () => {
  const data = listData;
  return (
    <div className='min-h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 p-6 bg-gray-50'>
      {/* Left Side - User Information and My Listings */}
      <div className='w-full min-h-[calc(100%-100px)]  lg:w-2/3 flex flex-col gap-6'>
        {/* User Information */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-semibold text-gray-900'>User Information</h1>
            <button className='bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1'>
              Update Profile
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <h3 className='text-lg font-semibold text-gray-700'>Avatar:</h3>
              <img src={userData.img} alt='User Avatar' className='w-16 h-16 rounded-full object-cover shadow-sm' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-700'>Username:</h3>
              <span className='text-gray-600'>{userData.name}</span>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-700'>Email:</h3>
              <span className='text-gray-600'>{userData.email}</span>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className='bg-white rounded-lg h-[400px] shadow-md p-6 overflow-y-scroll '>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-semibold text-gray-900'>My Listings</h1>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1'>
              Add New Post
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            {data.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Empty Container (as per your provided structure) */}
      <div className='w-full lg:w-1/3 bg-gray-100 rounded-lg shadow-md p-6 flex items-center justify-center overflow-hidden'>
        {/* You can add content for the right side here if needed */}
        <div className='text-center text-gray-600'>
          {/* Placeholder for right side content */}
          <h2 className='text-lg font-semibold mb-2'>Additional Information</h2>
          <p className='text-sm'>This section can be used to display more user-related information or suggestions.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;