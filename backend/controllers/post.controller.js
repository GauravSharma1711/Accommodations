import User from "../models/user.model.js"
import Post from "../models/post.model.js"
import PostDetail from "../models/postdetails.model.js"
import {ApiError} from '../utils/api-error.js'
import {ApiResponse} from '../utils/api-response.js'


export const getPosts = async(req,res)=>{

      try {
        const posts = await Post.find({});

        if(!posts){
            throw new ApiError(404,"no post found")
        }

        return res.status(200).json(
            new ApiResponse(200,{succes:true,message:"all posts fetched",data:posts})
        )

      } catch (error) {
        console.log("error in getPosts controller",error);
        throw new ApiError(500,"error while fetching all posts")
      }


}

export const getPostById = async(req,res)=>{
    try {
        const postId  = req.params.id;
        const post = await Post.findById(postId)

        if(!post){
            throw new ApiError(404," post not found")
        }

    return res.status(200).json(
     new ApiResponse(200,{succes:true,message:"post fetched successfully",data:post})
        )

      } catch (error) {
        console.log("error in getPostById controller",error);
        throw new ApiError(500,"error while fetching  postById")
      }
}


export const createPost = async (req, res) => {
  const userId = req.user.id; 
  try {
    const body = req.body;

    // Validate that the required fields are present
    if (!body.postData || !body.postDetails) {
      return res.status(400).json({
        error: 'Missing required fields: postData or postDetails',
      });
    }

  
    const existingPost = await Post.findOne({
      latitude: body.postData.latitude,
      longitude: body.postData.longitude,
    });

    if (existingPost) {
      return res.status(400).json({
        error: 'Post already exists with the same location',
      });
    }

  
    const newPost = await Post.create({
      postData: body.postData,
      createdBy: userId,
      postDetail: body.postDetails, 
    });

   
    return res.status(200).json(
      new ApiResponse(200, { success: true, message: 'Post created successfully', data: newPost })
    );
  } catch (error) {
    console.log('Error in createPost controller', error);
    return res.status(500).json({
      error: 'Error creating new post',
      details: error.message,
    });
  }
};


export const updatePost = async (req, res) => {
  const loggedInUser = req.user.id;
  const postId = req.params.id;

  const { 
    title, 
    price, 
    images, 
    address, 
    city, 
    bedroom, 
    bathroom, 
    latitude, 
    longitude, 
    type, 
    property,
    postDetail // Assuming postDetail comes in the request body for updating
  } = req.body;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(404, "Post not found");
    }

    // Check if the logged-in user is the creator of the post
    if (post.createdBy.toString() !== loggedInUser.toString()) {
      throw new ApiError(403, "Not authorized to update post");
    }

    // Update the post with the provided fields
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        ...(title && { title }),
        ...(price && { price }),
        ...(images && { images }),
        ...(address && { address }),
        ...(city && { city }),
        ...(bedroom && { bedroom }),
        ...(bathroom && { bathroom }),
        ...(latitude && { latitude }),
        ...(longitude && { longitude }),
        ...(type && { type }),
        ...(property && { property })
      },
      { new: true } // Ensure that the updated post is returned
    );

    // If postDetail exists, update it
    if (postDetail) {
      // Find and update the associated PostDetail
      const updatedPostDetail = await PostDetail.findOneAndUpdate(
        { post: postId }, // Find the associated PostDetail using postId
        {
          ...(postDetail.desc && { desc: postDetail.desc }),
          ...(postDetail.utilities && { utilities: postDetail.utilities }),
          ...(postDetail.pet && { pet: postDetail.pet }),
          ...(postDetail.income && { income: postDetail.income }),
          ...(postDetail.size && { size: postDetail.size }),
          ...(postDetail.school && { school: postDetail.school }),
          ...(postDetail.bus && { bus: postDetail.bus }),
          ...(postDetail.restaurant && { restaurant: postDetail.restaurant })
        },
        { new: true } // Ensure that the updated PostDetail is returned
      );

      if (!updatedPostDetail) {
        throw new ApiError(404, "Post details not found");
      }

      return res.status(200).json(
        new ApiResponse(200, {
          success: true,
          message: "Post and post details updated successfully",
          data: { updatedPost, updatedPostDetail }
        })
      );
    }

    // If no postDetail update, just return the updated post
    return res.status(200).json(
      new ApiResponse(200, {
        success: true,
        message: "Post updated successfully",
        data: updatedPost
      })
    );
  } catch (error) {
    console.log("Error in updatePost controller", error);
    throw new ApiError(500, "Error updating post", error);
  }
};


export const deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
  
    
  
      const deletedPost = await Post.findByIdAndDelete(postId);
      
      if (deletedPost) {
        return res.status(200).json(
          new ApiResponse(200, { message: 'Post deleted successfully' }, deletedPost)
        );
      } else {
        return res.status(404).json({
          error: 'Post not found',
        });
      }
    } catch (error) {
      console.log('Error in deletePost controller', error);
      return res.status(500).json({
        error: 'Error deleting post',
        details: error.message,
      });
    }
  };
  