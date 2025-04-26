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

export const updateUser = async(req,res)=>{

    const {username} = req.body

    const id = req.params.id;
    const loggedInUserId = req.user.id

          try {
    
        if(id.toString() !== loggedInUserId.toString()){
            throw new ApiError(403,"not authorized to update user")
        }
    
const user  = await User.findById(id);
user.username=username;
await user.save();
        
return res.status(200).json(
    new ApiResponse(200,{message:"user updated successfully",data:user}))


} catch (error) {
    console.log("error in updateUser controller",error);
    throw new ApiError(403,"cannot update user")

}




}

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