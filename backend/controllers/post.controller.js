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
    
}

export const createPost = async(req,res)=>{
    
}

export const updatePost = async(req,res)=>{
    
}

export const deletePost = async(req,res)=>{
    
}