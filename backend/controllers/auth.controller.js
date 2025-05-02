import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
      username,
      email,
      password:hashedPassword
    });

    // Remove password from response
    newUser.password = undefined;

    return res.status(200).json(
      new ApiResponse(201, {
        success: true,
        message: "User registered successfully",
        data: newUser
      })
    );

  } catch (error) {
    console.log("Error in register controller", error);
    throw new ApiError(500, "Error registering user");
  }
};

export const login = async(req,res)=>{

   const {email,password} = req.body;

   if(!email || !password){
      throw new ApiError(400,"all fields are required")
   }

 try {
     const user = await User.findOne({email});
     if(!user){
        throw new ApiError(404,"user not found")
     }
     
    //  const isMatch = await user.isPasswordCorrect(password);
    const isMatch = await bcrypt.compare(password,user.password);

     if(!isMatch){
      throw new ApiError(403,"unauthorized");
     }

     const token = jwt.sign(
      {
         id:user._id,
         email:user.email
      },
      process.env.JWT_SECRET,
      {
         expiresIn:process.env.JWT_EXPIRY
      }
     )

     const {password:userPassword,...userInfo} = user.toObject();

     res.cookie("jwt",token,{
      httpOnly:true,
      sameSite:"Strict",
    secure: process.env.NODE_ENV !== "development"
     })

     return res.status(200).json(
      new ApiResponse(200,{succes:true,message:"logged in successfully",data:userInfo})
     )

  
 } catch (error) {
   console.log("error in login controller",error);
   throw new ApiError(500,"error logging user")
 }


}

export const logout = async(req,res)=>{
   try {
      res.clearCookie("jwt", {
         httpOnly: true,
         sameSite: "Strict",
         secure: process.env.NODE_ENV !== "development" // fixed spelling
       });
       
       return res.status(200).json(
         new ApiResponse(200,{message:"logged out successfully"})
       )

   } catch (error) {
      console.log("error in logout controller",error)
      throw new ApiError(500,"error loggin out user");
   }

}