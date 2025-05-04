import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import User from "../models/user.model.js"
import Post from "../models/post.model.js";
import SavedPost from "../models/savedPost.model.js";

export const getUsers = async(req,res)=>{
    
    try {
        
        const users = await User.find();

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
            const savedPost = await SavedPost.findOne({
                savedBy: userId, createdBy: postId 
            })

            if(savedPost){
await SavedPost.findByIdAndDelete(savedPost._id);
await User.findByIdAndUpdate(userId,{$pull:{savedPosts:savedPost._id}} , { new: true })
await Post.findByIdAndUpdate(postId,{$pull:{savedPosts:savedPost._id}} , { new: true})
              return res.status(200).json(
                new ApiResponse(200,{message:"post deleted successfully"})
              )
            }

            const newSavedPost = await SavedPost.create({
                savedBy: userId,
                createdBy: postId,
              });

    await User.findByIdAndUpdate(userId,{$push:{savedPosts:newSavedPost._id}} , { new: true })
await Post.findByIdAndUpdate(postId,{$push:{savedPosts:newSavedPost._id}} , { new: true})

             return res.status(201).json(new ApiResponse(200,{ message: 'Post saved successfully', savedPost: newSavedPost }));


        } catch (error) {
            console.log("Error in savePost controller",error);
            return res.status(500,"error in savePost controller",error);
        }
}

export const profilePost = async(req,res)=>{

    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate('posts').populate('savedPosts');
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