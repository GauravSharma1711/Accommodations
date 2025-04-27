import jwt from 'jsonwebtoken'
import {ApiError} from '../utils/api-error.js'
import {ApiResponse} from '../utils/api-response.js'
import User from '../models/user.model.js';

export const authMiddleware = async(req,res,next)=>{

    try {
        const token = req.cookies?.jwt;
        if(!token){
            throw new ApiError(401,"token not found")
        }


        const decoded = jwt.verify(token,process.env.JWT_SECRET);
       if(!decoded){
        throw new ApiError(403,"unauthorized")
       }

       const userId = decoded.id;

       const user = await User.findById(userId);


       if (!user) {
        throw new ApiError(404, "User not found");
      }

       req.user =  user;
       next()



    } catch (error) {
        console.error("Error in auth middleware:", error.message);
        throw new ApiError(401, "Unauthorized: Invalid token");

    }

}