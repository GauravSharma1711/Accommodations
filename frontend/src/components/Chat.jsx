



import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest.js";
import { formatDistanceToNow } from 'date-fns';


const Chat = ({chats}) => {

  const {currentUser} = useContext(AuthContext)

  const [chatBox, setChatBox] = useState(null)
  
  
  const handleOpenChat = async(id,receiver)=>{
          try {
          const res = await apiRequest.get(`/chat/${id}`)
console.log("single chat",res.data.data.data);
console.log("cur user",currentUser);

setChatBox({...res.data.data.data,receiver})
            
          } catch (error) {
              console.log(error);
              
            
          }
    
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target)
    const text = formData.get("text");
    if(!text)return;
    try {
      
      const res = await apiRequest.post(`/message/${chatBox._id}`,{text})
      console.log(res);
      
 setChatBox(prev  =>({
  ...prev,
  messages:[...(prev.messages||[]) ,res.data.data.data]}))
  e.target.reset()
    } catch (error) {
      console.log(error);
      
    }

  }


  return (
    <div className="h-full flex flex-col">
      {/* Messages List */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-scroll p-4">
        <h1 className="font-light text-xl">Messages</h1>
        {chats?.map((chat, index) => (
          <div
          key={chat.id || index}
            className={` p-5 rounded-lg flex items-center gap-5 cursor-pointer ${chat.seenBy.includes(currentUser._id)?"bg-white":"bg-amber-100"}`}

            onClick={()=>handleOpenChat(chat.id,chat.receiver)}
          >
            <img
               src={chat.receiver?.avatar || "/noavatar.jpg"}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <span className="font-bold block">{chat.receiver?.username}</span>
              <p className="text-sm text-gray-600">{chat.lastMessage}...</p>
            </div>
          </div>
        ))}
      </div>



      {/* Chat Box */}

      {
      chatBox &&
      
      <div className="flex-1 bg-white flex flex-col justify-between">
        {/* Top Bar */}
        <div className="bg-yellow-300/50 p-5 font-bold flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={chatBox.receiver.avatar || "/noavatar.jpg"}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{chatBox.receiver.username}</span>
          </div>
          <span 
          onClick={()=>setChatBox(null)}
           className="cursor-pointer">X</span>
        </div>

        {/* Messages Area */}
        <div className="h-[350px] overflow-y-scroll p-5 flex flex-col gap-5">
          
          {chatBox.messages.map((msg, index) => (
            <div
              key={msg._id}
              className={`w-1/2 p-2 rounded 
                ${msg.senderId === currentUser._id ? "self-end text-right" : "self-start text-left"}
              `}
  
            >
              <p>{msg.text}</p>
              <span className="text-xs bg-yellow-300/25 p-1 rounded">
      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
       </span>
            </div>
          ))}

         
        </div>

        {/* Input Bar */}
        <form 
        onSubmit={handleSubmit}
        className="border-t-2 border-yellow-300/50 h-16 flex items-center justify-between">
          <textarea
            name="text"
            placeholder="Type a message..."
            className="flex-1 h-full border-none p-5 resize-none focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-32 h-full bg-yellow-300/50 border-none cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
}
    </div>
  );
};

export default Chat;

