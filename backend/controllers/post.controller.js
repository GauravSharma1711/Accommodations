import User from "../models/user.model.js"
import Post from "../models/post.model.js"
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

export const createPost = async(req,res)=>{
    
    const userId = req.user.id;

    try {
 const {title,price,images,address,city
          ,bedroom,bathroom,latitude,longitude,type,property
        } = req.body

        const existingPost = await Post.findOne({ latitude , longitude});

        if(existingPost)throw new ApiError(400,"Post already exists");

    const newPost = await Post.create({
        title,price,images,address,city,bedroom,bathroom,latitude,longitude,type,property,
        createdBy:userId
           })

           return res.status(200).json(
            new ApiResponse(200,{succes:true,message:"post created successfully",data:newPost})
           )

    } catch (error) {
        console.log("error in createPost controller",error);
        throw new ApiError(500,"Error creating new post",error);
    }



}

export const updatePost = async(req,res)=>{
    const loggedInUser = req.user.id;
    const postId = req.params.id;

    const {title,price, } = req.body

    try {

        const post = await Post.findById(postId);
        if(!post){
            throw new ApiError(404 , "Post not found")
        }

        if(post.createdBy.toString() !== loggedInUser.toString()){
            throw new ApiError(403 , "Not authorized to update post")
        }


        const updatedPost =  await Post.findByIdAndUpdate(postId,{
          ...(title && {title}),
          ...(price && {price})
        })


        return res.status(200).json(
            new ApiResponse(200,{succes:true,message:"post updated successfully",data:updatedPost})
           )

    } catch (error) {
        console.log("error in updatePost controller",error);
        throw new ApiError(500,"Error updating new post",error);
    }



}

export const deletePost = async(req,res)=>{
    
}