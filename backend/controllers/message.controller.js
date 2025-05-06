import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";


export const addMessage = async(req,res)=>{
    try {
        const userId  = req.user.id;
        const chatId = req.params.chatId;
        const text = req.body.text;

        const chat = await Chat.findOne(
            {
                _id:chatId,
                users:{$in:[userId]}
            }
        )

        if (!chat) {
            return res.status(404).json(new ApiResponse(404, { message: "Chat not found" }));
        }

        const message = await Message.create({
            text,
            senderId:userId,
            chat:chatId
        })

        await Chat.findOneAndUpdate(
            {
            _id:chatId,
            users:{$in:[userId]}
        }
        ,
        { 
           seenBy:[userId],
           lastMessage: text,
           $push: { messages: message._id }
        }, { new: true })


        return res.status(200).json(
            new ApiResponse(200,{data:message})
        )
    } catch (error) {
        console.log("error in message controller",error);
        throw new ApiError(500,"error in getting message",error.message)
    }
}