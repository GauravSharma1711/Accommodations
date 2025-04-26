import bcrypt from "bcryptjs"
import User from "../models/auth.model.js";
import {ApiResponse} from '../utils/api-response.js'
import {ApiError} from '../utils/api-error.js'

 export const register = async(req,res)=>{

    const {username , email , password}  = req.body

             try {
          
               const existingUser = await User.findOne({email});

               if(existingUser){
                  throw new ApiError(400,"User already exists")
               }
               


   const hashedPassword = await bcrypt.hash(password,10);

   const newUser = await User.create({
      username,
      email,
      password: hashedPassword
   });
   

   return res.status(200).json(
      new ApiResponse(201,{success:true,message:"User registered successfully",data:newUser})
   )
   

             } catch (error) {
               console.log("Error in register controller",error);
               throw new ApiError(500, "Error registering user");
             }
}


