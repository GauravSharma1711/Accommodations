import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

     text:{
        type:String,
        required:true,
     },
     senderId:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     },
     chat:{
        type: mongoose.Schema.Types.ObjectId,
     ref: "Chat",
     }



},{timestamps:true})

const Message = mongoose.model("Message",messageSchema);
export default Message

