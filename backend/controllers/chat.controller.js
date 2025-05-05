import Chat from '../models/chat.model.js'
import Message from '../models/message.model.js'
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';

export const getChats = async(req,res)=>{
 
    try {
        
        const chats = await Chat.find();

        if(!chats){
            throw new ApiError(404,"no chat found")
        }

        return res.status(200).json(
            new ApiResponse(200,{message:"chats fetched successfully",data:chats})
        )


    } catch (error) {
        throw new ApiError(500,"chats not found",error)
    }
}

export const getChat = async(req,res)=>{
    try {
        const chatId = req.params.id;
           const userId = req.user.id;
        const chat = await Chat.findOne(
         { 
            _id:  chatId,
            users:{$in:[userId]}
           }
        ).populate({
            path:'messages',
            options: { sort: { createdAt: 1 } },
        })

        if(!chat){
            throw new ApiError(404," chat with id not found")
        }
    
        await Chat.findByIdAndUpdate(chatId,{
          $addToSet:{seenBy:userId}
        })


        return res.status(200).json(
            new ApiResponse(200,{message:"chat found successfully",data:chat})
        )
       } catch (error) {
        console.log("error in getChatById controller",error);
        throw new ApiError(500,"error in getting chatById")
       }
}

export const addChat = async(req,res)=>{
      const userId = req.user.id
    try {
        
        const newChat = await Chat.create({
           
             users:[  userId  , req.body.receiverId]
            
        })

        return res.status(200).json(new ApiResponse(201,{data:newChat}))

    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, "error in add chat controller",error.message));
    }

}

export const readChat = async(req,res)=>{
    try {
        const userId = req.user.id;
        const chatId = req.params.id;
        const chat = await Chat.findOneAndUpdate(
            {
            _id:chatId,
            users:{$in:[userId]}
        }
        ,
        { 
            $addToSet:{seenBy:userId}
        }, { new: true })

        if (!chat) {
            return res.status(404).json(new ApiResponse(404, { message: "Chat not found" }));
        }

        return res.status(200).json(
            new ApiResponse(200,{message:"chat read successfully",data:chat})
        )
       
    } catch (error) {
        console.log("error in read controller",error);
        throw new ApiError(500,"error in getting readchat",error.message)
    }
}