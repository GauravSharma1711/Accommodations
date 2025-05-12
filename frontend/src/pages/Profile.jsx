import React, { useContext, useEffect, useState } from 'react';
import { userData, listData } from '../lib/dummy.js';
import Card from '../components/Card'; // Assuming you have a Card component
import Chat from '../components/Chat.jsx';

import apiRequest from '../lib/apiRequest.js';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Profile = () => {

  const {updateUser,currentUser} = useContext(AuthContext)

  const [created , setCreated] = useState(null);
  const [saved , setSaved] = useState(null);

  const [chats , setChats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  
    if(!currentUser){
      navigate('/login')
      return
    }

   
    

    const fetchPost = async ()=>{
      const res = await apiRequest.get(`/user/profilePost/${currentUser._id}`)
      const userPosts = res.data.data.userPosts
      const savedPosts = res.data.data.savedPosts
      console.log(userPosts);
      console.log(savedPosts);
      
      
         setCreated(userPosts);
         setSaved(savedPosts);
    }

    const fetchChats = async ()=>{
      const res = await apiRequest.get('/chat/getChats');
       console.log("chats",res.data.data.data);
       setChats(res.data.data.data)
    }

    fetchChats();
fetchPost();
  }, [currentUser,navigate])
  




  const logoutHandler = async(e)=>{
      e.preventDefault();
      try {
        await apiRequest.delete('/auth/logout')
       updateUser(null)
        navigate('/login')
      } catch (error) {
        console.log(error);
      };
  }





  return (
    <div className='min-h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 p-6 bg-gray-50'>
      {/* Left Side - User Information and My Listings */}
      <div className='w-full min-h-[calc(100%-100px)]  lg:w-2/3 flex flex-col gap-6'>
        {/* User Information */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-semibold text-gray-900'>User Information</h1>

            <div className=' flex gap-2'>
              
              <Link to={`/updateProfile/${currentUser._id}`} >
            <button
            className='bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1'>
              Update Profile
            </button>
              </Link>
            <button
             className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1'
             onClick={logoutHandler}
             >
              Logout Profile
            </button>
            </div>

          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <h3 className='text-lg font-semibold text-gray-700'>Avatar:</h3>
              <img src={currentUser.avatar ||  '/noavatar.jpg'} alt='User Avatar' className='w-16 h-16 rounded-full object-cover shadow-sm' />
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-700'>Username:</h3>
              <span className='text-gray-600'>{currentUser.username}</span>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-700'>Email:</h3>
              <span className='text-gray-600'>{currentUser.email}</span>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <div className='bg-white rounded-lg h-[400px] shadow-md p-6 overflow-y-scroll '>
                <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-semibold text-gray-900'>My Listings</h1>
            <Link to={'/add'}>
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1'>
              Add New Post
            </button>
            </Link>
          </div>
          <div className='flex flex-col gap-4'>
            {created?.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </div>

{/* my saved */}
        <div className='bg-white rounded-lg h-[400px] shadow-md p-6 overflow-y-scroll '>
                <div className='flex items-center justify-between mb-4'>
            <h1 className='text-xl font-semibold text-gray-900'>My Saved</h1>
        
          </div>
          <div className='flex flex-col gap-4'>
            {saved?.map((item) => (
              <Card key={item._id} item={item.createdBy} />
            ))}
          </div>
        </div>

      </div>

      {/* Right Side - Empty Container (as per your provided structure) */}
      <div className=' min-h-[calc(100vh-100px)]  w-full lg:w-1/3 bg-[rgb(252,245,243)] rounded-lg shadow-md p-6  
       overflow-hidden'>

     <Chat chats={chats} />
       
      </div>
    </div>
  );
};

export default Profile;