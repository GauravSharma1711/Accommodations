import React from 'react'

import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api.js";
import { Link } from "react-router-dom";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";


import FriendCard from "../components/FriendCard";

const Users = () => {

  const [outgoingRequestIds,setOutGoingRequestIds] = useState(new Set())

  const [friends,setFriends] = useState([]);
  const [recommendedUsers,setRecommendedUser] = useState([])
  const [outgoingRequest,setOutgoingRequest] = useState([])


  //friends
  useEffect(() => {
   
    const getFriends = async()=>{
      try {
        const {data} = await getUserFriends();
        setFriends(data || []);
      } catch (error) {
        console.error("error in gettingFriends",error)
      }
    }

    getFriends();
  }, [])
  
//recommended users
   useEffect(() => {
   
    const getUsers = async()=>{
      try {
        const data = await getRecommendedUsers();
       
        setRecommendedUser(data || []);
      } catch (error) {
        console.error("error in getting recommended users",error)
      }
    }

    getUsers();
  }, [])
  
  //outgoing req
  useEffect(() => {
    const outgoingReq = async()=>{
  try {
        const {data} = await getOutgoingFriendReqs();
        setOutgoingRequest(data || []);
      } catch (error) {
        console.error("error in getting outgoing request ",error)
      }
    }
    outgoingReq()
   
  }, [])
  

    const sendRequest = async (id) => {
  try {
    const data = await sendFriendRequest(id);
    const { data: updatedRequests } = await getOutgoingFriendReqs();
    setOutgoingRequest(updatedRequests || []);
    return data;
  } catch (error) {
    console.log("error sending friend request", error);
  }
};


useEffect(() => {
           
  const outgoingIds = new Set();
  if(outgoingRequest && outgoingRequest.length>0){
    outgoingRequest.forEach((req)=>{ 
      outgoingIds.add(req.recipient._id)
    });
     setOutGoingRequestIds(outgoingIds);
  }
  
}, [outgoingRequest])




  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-amber">Your Friends</h2>
          <Link
            to="/notifications"
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-amber-600 border border-amber-600 rounded-md hover:bg-blue-50 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <UsersIcon className="mr-2 w-4 h-4" />
            Friend Requests
          </Link>
        </div>


        {
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {friends.map((friend) => (
       <FriendCard key={friend._id} friend={friend} />
       ))}
      </div>

        }

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-amber">Meet New People</h2>
                <p className="text-gray-600 dark:text-gray-400">
                All recomended users here
                </p>
              </div>
            </div>
          </div>


         {/* Meet New People Section */}
{
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {recommendedUsers.map((user) => {
      const hasRequestBeenSent = outgoingRequestIds.has(user._id);

      return (
        <div key={user._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
              </div>
              <span className='font-bold text-white'>{user.username}</span>
            </div>

            <button
              className={`w-full mt-2 flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200
                ${hasRequestBeenSent
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                }`
              }
              onClick={() => sendRequest(user._id)}
              disabled={hasRequestBeenSent}
            >
              {hasRequestBeenSent ? (
                <>
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Request Sent
                </>
              ) : (
                <>
                  <UserPlusIcon className="w-4 h-4 mr-2" />
                  Send Friend Request
                </>
              )}
            </button>
          </div>
        </div>
      );
    })}
  </div>
}

        </section>
      </div>
    </div>
  );
};

export default Users