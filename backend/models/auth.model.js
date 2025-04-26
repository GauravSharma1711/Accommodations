import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { type } from "os";

const userSchema = new mongoose.Schema({

  username:{
    type:String,
    trim:true,
    required:true,
    unique:true,
    lowercase:true,
  },
     email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },

       password:{
          type:String,
          required:true,
         },

         avatar:{
        type:String
         },

         isEmailVerified:{
            type:Boolean,
            default:false,
         },

         forgotPasswordToken:{
                   type:String
         },
         forgotPasswordExpiry:{
                   type:Date
         },
         emailVerificationToken:{
               type:String
         },
         emailVerificationExpiry:{
                 type:Date
         },
         refreshToken:{
            type:String
         }




},{timestamps:true})



userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password  = await bcrypt.hash(this.password ,10);
    next();
})


userSchema.methods.isPasswordCorrect  = async function(password) {
      return await  bcrypt.compare(password,this.password);
}

userSchema.method.generateAccessToken =  async function() {
  return  jwt.sign(
        {
               _id:this._id,
               email:this.email,
               username:this.username
        },
process.env.ACCESS_TOKEN_SECRET,
        {
expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )


}

userSchema.method.generateRefreshToken =  async function() {
    return  jwt.sign(
          {
                 _id:this._id,
                 
          },
  process.env.REFRESH_TOKEN_SECRET,
          {
  expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
          }
      )
  
  
  }


  userSchema.methods.generateTemperoryToken  = async function(){
        const unhashedToken  = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(unhashedToken).digest("hex");
        const tokenExpiry = Date.now() + (20*60*1000);

        return {unhashedToken,hashedToken,tokenExpiry}
  }








const User = mongoose.model("User",userSchema);

export default User;