import apiRequest from "./apiRequest.js";


export const getRecommendedUsers = async()=>{
  try {
    const data = await apiRequest.get('/user/getUsers')
    
    
    return data.data.data.data
  } catch (error) {
    console.log("error in gettingrecommendedusers",error.message);
    
  }
}

export const getUserFriends = async()=>{
     try {
    const data = await apiRequest.get('/user/friends')
    return data
  } catch (error) {
    console.log("error in gettinguserfriends",error.message);
    
  }
}

export const  getOutgoingFriendReqs = async()=>{
       try {
    const data = await apiRequest.get('/user/outgoing-friend-requests')
    return data
  } catch (error) {
    console.log("error in gettinguserfriends",error.message);
    
  }
}

export const sendFriendRequest = async(id)=>{
        try {
    const data = await apiRequest.post(`/user/friend-request/${id}`)
    return data
  } catch (error) {
    console.log("error in gettinguserfriends",error.message);
    
  }
}

export const acceptFriendRequest = async(id)=>{
        try {
    const data = await apiRequest.put(`/user/friend-request/${id}/accept`)
    return data
  } catch (error) {
    console.log("error in gettinguserfriends",error.message);
    
  }
}

export const getFriendRequests = async()=>{
        try {
    const data = await apiRequest.get(`/user/friend-requests`)
    return data
  } catch (error) {
    console.log("error in gettinguserfriends",error.message);
    
  }
}


      export const getStreamToken = async()=>{
        const res = await apiRequest.get('/chat/token');
        return res
      }
