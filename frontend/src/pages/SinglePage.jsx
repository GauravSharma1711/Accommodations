import React,{useState,useEffect, useContext} from 'react';
import Slider from '../components/Slider';

import Map from '../components/Map.jsx';
import apiRequest from '../lib/apiRequest.js';

import {AuthContext} from '../context/AuthContext.jsx'
import { useNavigate, useParams } from 'react-router-dom';



const SinglePage = () => {

 
  const { id } = useParams();
  const [post, setPost] = useState(null);
  
   const [issaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext)
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest.get(`/post/getPostById/${id}`);
        const postData = res.data.data.data;
        const savedFlag = res.data.data.isSaved;
       console.log(savedFlag);
       
        setPost(postData);
       
        
        
        setIsSaved(savedFlag);
       
      } catch (err) {
        console.log("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);


  useEffect(() => {
    console.log("Post updated:", post);
  }, [post]);
  
 
  const handleSave = async(e)=>{
 e.preventDefault();
 if(!currentUser){
navigate('/login');
return
 }

try {
  const res = await apiRequest.post('/user/savePost',{
    postId:id
  })
  setIsSaved(prev => !prev);
  console.log(res);
} catch (error) {
  console.log(error);
 
}

 
  }



  if (!post) return <div>Loading...</div>;




  return (
    <div className='min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 p-6 bg-gray-50'>
      {/* Left Side (Image Slider and Details) */}
      <div className='w-full lg:w-2/3 flex flex-col gap-6'>
        <Slider images={post.images} />
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='mb-6'>
            <h1 className='text-3xl font-semibold text-gray-900 mb-3'>{post.title}</h1>
            <div className='flex items-center text-gray-600 text-sm mb-2'>
              <img src='/pin.png' alt='Location' className='w-5 h-5 mr-2' />
              <span>{post.address}</span>
            </div>
            <div className='text-2xl font-bold text-amber-600'>${post.price}</div>
          </div>
          <div className='flex items-center gap-6 mb-6'>
            <div className='flex items-center gap-3'>
              <img src={post.createdBy.avatar} alt={post.createdBy.username} className='w-12 h-12 rounded-full object-cover' />
              <span className='text-gray-800 font-medium text-lg'>{post.createdBy.username}</span>
            </div>
            <div className='flex items-center gap-3 text-gray-600'>
              <img src='/bed.png' alt='Bedrooms' className='w-5 h-5' />
              <span>{post.bedroom} Beds</span>
            </div>
            <div className='flex items-center gap-3 text-gray-600'>
              <img src='/bath.png' alt='Bathrooms' className='w-5 h-5' />
              <span>{post.bathroom} Baths</span>
            </div>
            <div className='flex items-center gap-3 text-gray-600'>
              <img src='/size.png' alt='Size' className='w-5 h-5' />
              <span>{post.propertysize} sqft</span>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-3'>Description</h2>
            <p className='text-gray-700 leading-relaxed'>{post.postDetail.desc}</p>
          </div>
        </div>
      </div>

      {/* Right Side (General Info, Room Sizes, Nearby, Location, Actions) */}
      <div className='w-full lg:w-1/3 flex flex-col gap-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>General</h2>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <img src='/utility.png' alt='Utilities' className='w-6 h-6 text-gray-500' />
              <div>
                <h3 className='text-sm font-bold text-gray-800'>Utilities</h3>
                <p className='text-xs text-gray-600'>{post.postDetail.utilities} is responsible</p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <img src='/pet.png' alt='Pet Policy' className='w-6 h-6 text-gray-500' />
              <div>
                <h3 className='text-sm font-bold text-gray-800'>Pet Policy</h3>
                <p className='text-xs text-gray-600'>Pets {post.postDetail.pet}</p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <img src='/utility.png' alt='Property Policy' className='w-6 h-6 text-gray-500' />
              <div>
                <h3 className='text-sm font-bold text-gray-800'>Income Policy</h3>
                <p className='text-xs text-gray-600'>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Room Sizes</h2>
          <div className='flex gap-6'>
            <div className='flex items-center gap-2 text-gray-700'>
              <img src='/size.png' alt='Size' className='w-5 h-5' />
              <div className='font-bold'>Size: <span className='font-normal'>{post.postDetail.roomsize}</span></div>
            </div>
            <div className='flex items-center gap-2 text-gray-700'>
              <img src='/bed.png' alt='Bedroom' className='w-5 h-5' />
              <div className='font-bold'>Bedrooms: <span className='font-normal'>{post.postDetail.bedroomsize}</span></div>
            </div>
            <div className='flex items-center gap-2 text-gray-700'>
              <img src='/bath.png' alt='Bathroom' className='w-5 h-5' />
              <div className='font-bold'>Bathrooms: <span className='font-normal'>{post.postDetail.bathroomsize}</span></div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Nearby Places</h2>
          <div className='flex flex-col gap-4 text-gray-700'>
            <div className='flex items-center gap-4'>
              <img src='/school.png' alt='School' className='w-5 h-5' />
              <div>
                <span className='font-bold'>School:</span>
                <p className='text-sm'>{post.postDetail.school || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <img src='/bus.png' alt='Bus Stop' className='w-5 h-5' />
              <div>
                <span className='font-bold'>Bus Stop:</span>
                <p className='text-sm'>{post.postDetail.bus || 'N/A'}</p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <img src='/restaurant.png' alt='Restaurant' className='w-5 h-5' />
              <div>
                <span className='font-bold'>Restaurant:</span>
                <p className='text-sm'>{post.postDetail.restaurant || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-bold text-gray-900 mb-4'>Location</h2>
          <div className='rounded-md overflow-hidden w-full h-64 '>
            <Map items={[post]} key={post._id} />
          </div>
        </div>

        <div className='mt-4 flex gap-3'>
          <button className='flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1'>
            <img src='/chat.png' alt='Chat' className='w-5 h-5' />
            Send a Message
          </button>
          <button
          onClick={handleSave}

          className={`flex-1 flex items-center justify-center gap-2 ${
            issaved ? 'bg-amber-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          } font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1`}
          
          
          >

            <img src='/save.png' alt='Save' className='w-5 h-5' />
           { issaved ? "place saved" : "Save this Place"}
          
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;