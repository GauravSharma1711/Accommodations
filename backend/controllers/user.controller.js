import User from "../models/user.model.js"
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";

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


export const getUser = ()=>{

}

export const updateUser = ()=>{

}

export const deleteUser = ()=>{

}