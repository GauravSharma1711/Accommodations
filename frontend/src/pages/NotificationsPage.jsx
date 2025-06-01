import React, { useState,useEffect } from 'react'
import { acceptFriendRequest, getFriendRequests} from '../lib/api.js'
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";


const NotificationsPage = () => {

    const [friendRequests, setFriendRequests] = useState(null);
  
  const [acceptingId, setAcceptingId] = useState(null);


  
  const fetchFriendRequests = async () => {
    try {
      const res = await getFriendRequests();
      console.log("friendreq",res);
      
      setFriendRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch friend requests", err);
    } 
  };

  const handleAcceptRequest = async (id) => {
    try {
      setAcceptingId(id);
       await  acceptFriendRequest(id)
      fetchFriendRequests();
     
    } catch (err) {
      console.error("Error accepting request:", err);
    } finally {
      setAcceptingId(null);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

const incomingRequests = friendRequests?.incomingRequests || [];
const acceptedRequests = friendRequests?.acceptedRequests || [];



  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-gray-900 dark:text-amber">Notifications</h1>

        {
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-amber">
                  <UserCheckIcon className="h-5 w-5 text-blue-600" /> 
                  Friend Requests
                  <span className="ml-2 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"> 
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-gray-100 dark:bg-amber-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" 
                    >
                      <div className="p-4"> 
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700"> 
                              <img src={request.sender.avatar} alt={request.sender.username} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{request.sender.username}</h3>
                            </div>
                          </div>

                          <button
                            className={`flex items-center justify-center px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200
                              ${
                                request._id===acceptingId
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                                  : "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                              }`
                            } 
                            onClick={() => handleAcceptRequest(request._id)}
                            disabled={request._id===acceptingId}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

           
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <BellIcon className="h-5 w-5 text-green-600" /> 
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"> 
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 mt-1"> 
                            <img
                              src={notification.recipient.avatar}
                              alt={notification.recipient.username}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{notification.recipient.username}</h3>
                            <p className="text-sm my-1 text-gray-700 dark:text-gray-300">
                              <span className="font-medium">{notification.recipient.username}</span> accepted your friend request
                            </p>
                            <p className="text-xs flex items-center text-gray-500 dark:text-gray-400"> 
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"> {/* badge badge-success -> custom tailwind */}
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            
          </>
        }
      </div>
    </div>
  )
}

export default NotificationsPage