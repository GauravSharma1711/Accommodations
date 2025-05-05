import React, { useContext,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import apiRequest from '../lib/apiRequest.js';
import UploadWidget from '../components/UploadWidget.jsx';


const ProfileUpdate = () => {

    const navigate = useNavigate();

    const [error,setError] = useState("");

    const { id } = useParams();

    const {currentUser, updateUser} = useContext(AuthContext);

const  [avatar, setAvatar] = useState([])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const {username,email,password} = Object.fromEntries(formData)

        try {
            console.log("currentUser:", currentUser);

         const res = await apiRequest.put(`/user/updateUser/${currentUser._id}`,{
            username,
            email,
           password:password.trim(),
            avatar:avatar[0]
         })
         console.log(res)
         updateUser(res.data.data.data);
         navigate('/profile');
        } catch (error) {
            setError(error)
            console.log(error);
            
        }
    }
  

  return (
    <div className="flex h-full">
      {/* Form Container */}
      <div className="flex flex-3 items-center justify-center w-full p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center">Update Profile</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-medium">Username</label>
            <input
              id="username"
              name="username"
             defaultValue={currentUser.username}
              type="text"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input
              id="email"
              name="email"
             defaultValue={currentUser.email}
              type="email"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <button
            type="submit"
            className="p-4 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 transition duration-200"
          >
            Update
          </button>

          {/* Error display */}
          {error && <span className="text-red-500 text-sm">error</span>  }
        </form>
      </div>

      {/* Side Container */}
      <div className="flex-2 bg-[#fcf5f3] flex flex-col items-center justify-center gap-5 p-6">
        <img
          src={(avatar[0] ||currentUser.avatar) || "/noavatar.jpg"}
          defaultValue={currentUser.avatar || "/noavatar.jpg"}
          alt="avatar"
          className="w-1/2 object-cover rounded-full"
        />

        {/* UploadWidget goes here */}
        <div className="w-full flex justify-center">
          {/* Replace with UploadWidget component */}
          <UploadWidget uwConfig={{
            cloudName:"dgxuc0gyp",
            uploadPreset:"accommodation",
            multiple:false,
            maxImageFileSize:2000000,
            folder:"avatars"
          }} 
          setState = {setAvatar}
          />
          {/* <button className="px-4 py-2 bg-gray-200 rounded-md">Upload Widget</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
