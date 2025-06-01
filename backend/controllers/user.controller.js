import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import User from "../models/user.model.js"
import Post from "../models/post.model.js";
import SavedPost from "../models/savedPost.model.js";
import bcrypt from "bcryptjs";
import FriendRequest from "../models/FriendRequest.js";

export const getUsers = async(req,res)=>{
    
    try {
        const curUserId = req.user.id;
        const curUser = req.user;

        const users = await User.find({
          $and:[
            {_id:{$ne:curUserId}},
            {_id:{$nin:curUser.friends}},
          ]
        });

        if(!users){
            throw new ApiError(404,"no user found")
        }

        return res.status(200).json(
            new ApiResponse(200,{message:"users fetched successfully",data:users})
        )


    } catch (error) {
        throw new ApiError(500,"users not found",error)
    }

}

export const getUser = async(req,res)=>{
   try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404,"user with id not found")
    }

    return res.status(200).json(
        new ApiResponse(200,{message:"user found successfully",data:user})
    )
   } catch (error) {
    console.log("error in getUserById controller",error);
    throw new ApiError(500,"error in getting userById")
   }
}

export const updateUser = async (req, res) => {
    const { password, avatar, ...inputs } = req.body;
    const id = req.params.id;
    const loggedInUserId = req.user.id;
  console.log(password);
  
    try {
      if (id.toString() !== loggedInUserId.toString()) {
        throw new ApiError(403, "Not authorized to update user");
      }
  
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      const updateFields = {
        ...inputs,
        ...(hashedPassword && { password: hashedPassword }),
        ...(avatar && { avatar }),
      };
  
      const result = await User.findByIdAndUpdate(
        id,
        updateFields,
        {
          new: true,
          select: "-password", // exclude password from response
        }
      );
  
      if (!result) {
        throw new ApiError(404, "User not found");
      }
  
      return res.status(200).json(
        new ApiResponse(200, {
          message: "User updated successfully",
          data: result,
        })
      );
  
    } catch (error) {
      console.log("error in updateUser controller", error);
      throw new ApiError(403, "Cannot update user");
    }
  };
  

export const deleteUser = async(req,res)=>{

    try {
        const userId = req.params.id;
      
        const deletedUser = await User.findOneAndDelete({ _id: userId });


        if(deletedUser){
            return res.status(200).json(
                new ApiResponse(200,{message:"user deleted successfully",deletedUser})
            )
        }else{
            throw new ApiError(404,"user not found")
        }
   } catch (error) {
    console.log("error in deleteUser controller",error);
    throw new ApiError(404,"user deletion byId failed")
   }



}

export const savePost = async(req,res)=>{
    
        const {postId} = req.body;
        const userId = req.user.id;

        try {
            const existingSavedPost = await SavedPost.findOne({
                savedBy: userId, createdBy: postId 
            })

            if(existingSavedPost){
await SavedPost.findByIdAndDelete(existingSavedPost._id);
await User.findByIdAndUpdate(userId,{$pull:{savedPosts:existingSavedPost._id}} , { new: true })
await Post.findByIdAndUpdate(postId,{$pull:{savedPosts:existingSavedPost._id}} , { new: true})
              return res.status(200).json(
                new ApiResponse(200,{message:"post unsaved successfully"})
              )
            }


            //save the psot
            const newSavedPost = await SavedPost.create({
                savedBy: userId,
                createdBy: postId,
              });

    await User.findByIdAndUpdate(userId,{$push:{savedPosts:newSavedPost._id}} , { new: true })
await Post.findByIdAndUpdate(postId,{$push:{savedPosts:newSavedPost._id}} , { new: true})

             return res
             .status(201)
             .json(new ApiResponse(200,{ message: 'Post saved successfully', savedPost: newSavedPost }));


        } catch (error) {
            console.log("Error in savePost controller",error);
            return res
            .status(500,"error in savePost controller",error);
        }
}

export const profilePost = async(req,res)=>{

    const userId = req.params.id;

    try {
        const user = await User.findById(userId)
        .populate('posts')
        .populate({
          path:'savedPosts',
          populate:{
            path:'createdBy',
            model:'Post'
          }
        });


        if(!user){
            throw new ApiError(404,"User not found")
        }
      
if ((!user.posts || user.posts.length === 0) && (!user.savedPosts || user.savedPosts.length === 0)) {
            throw new ApiError(404, "No posts found for this user");
        }

        return res.status(200).json(
            new ApiResponse(200,{userPosts:user.posts,savedPosts:user.savedPosts})
        )
    } catch (error) {
        console.log("error in get profilePosts controller",error);
        throw new ApiError(500,"error fetching posts",error);
    }

}

// ------------------------------------------------------------------

export const getMyFriends = async(req,res)=>{
try {
  const user = await User.findById(req.user.id).select("friends").populate('friends' ,"username email avatar")
  res.status(200).json(user.friends)
} catch (error) {
console.log("Error in gewtMyFriends controller",error.message);
   throw new ApiError(500,"No friend found",error)
}
}

export const sendFriendRequest = async(req,res)=>{
  try {
    
    const myId = req.user.id;
    const {id:recipientId} = req.params

    //prevent sending request to yourself
    if(myId===recipientId){
      return res.status(400).json({message:"you cant send friend request to yourself"})
  }


  const recipient = await User.findById(recipientId);
  if(!recipient){
    return res.status(404).json({message:" recipient not found"})
  }

  //check already friend
  if(recipient.friends.includes(myId)){
    return res.status(400).json({message:"you are already friends with this user"})
  }

  //check req already exist
  const existingRequest  = await FriendRequest.findOne({
    $or:[
      {sender:myId , recipient:recipientId},
       {sender:recipientId , recipient:myId},
    ]
  })

  if(existingRequest){
     return res.status(400).json({message:"request already exist"})
  }

  const friendRequest = await FriendRequest.create({
    sender:myId,
    recipient:recipientId
  })

  res.status(201).json(friendRequest);


} catch (error) {
    console.log("Error in sendFriendRequest controller",error.message);
   throw new ApiError(500," not able to send friends request",error)
  }
}


export const acceptFriendRequest = async(req,res)=>{
  try {
    
   
    const {id:requestId} = req.params

    const friendRequest  = await FriendRequest.findById(requestId)
    if(!friendRequest){
      return res.status(404).json({message:"no such friend request found"})
    }

    if(friendRequest.recipient.toString()!==req.user.id){
      return res.status(403).json({message:"you are not authorized to accept request"})
    }

    friendRequest.status = "accepted"
     await friendRequest.save();

     //add each user to others friends array
      await User.findOneAndUpdate(friendRequest.sender,{
        $addToSet:{friends:friendRequest.recipient}
      })
      await User.findOneAndUpdate(friendRequest.recipient,{
        $addToSet:{friends:friendRequest.sender}
      })






    return res.status(200).json({message:"accepted friend request"})

  } catch (error) {
    console.log("Error in acceptFriendRequest controller",error.message);
   throw new ApiError(500," not able to accept friends request",error)
  }
}


export const getFriendRequest  = async(req,res)=>{
  try {
    const myId = req.user.id;

    const incomingRequests = await FriendRequest.find({
      recipient:myId,
      status:"pending",
    }).populate("sender", "username avatar")


    const acceptedRequests = await FriendRequest.find({
      sender:myId,
      status:"accepted",
    }).populate("recipient", "username avatar")

    res.status(200).json({incomingRequests,acceptedRequests})

  } catch (error) {
    console.log("Error in getFriendRequest controller",error.message);
   throw new ApiError(500," not able to get friends request",error)
  }
}

export const getOutgoingFriendRequest = async (req,res)=>{
   try {

    const myId = req.user.id;

    const outgoingfriendRequest = await FriendRequest.find({
      sender:myId,
      status:"pending"
    }).populate("recipient" , "username avatar")

    res.status(200).json(outgoingfriendRequest)

    
   } catch (error) {
     console.log("Error in getOutgoingFriendRequest controller",error.message);
   throw new ApiError(500," not able to get outgoing friends request",error)
   }
}