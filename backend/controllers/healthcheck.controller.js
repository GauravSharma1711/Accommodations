import {ApiResponse} from '../utils/api-response.js'
import {ApiError} from '../utils/api-error.js'
const healthcheck = async(req,res)=>{
   try {
         await console.log("health check");
         
    res.status(200).json(

         new ApiResponse(200,{message:"Server is running"})
     )
   } catch (error) {
    throw new ApiError(500,"Internal server error");
   }
}

export {healthcheck}