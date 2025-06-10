import React ,{useContext}from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStreamToken } from "../lib/api.js";

import { AuthContext } from '../context/AuthContext';

import ChatLoader from '../components/ChatLoader'

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


const ChatPage = () => {

 const { id: targetUserId } = useParams();

 const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const[token,setToken] = useState(null);

 const {currentUser} = useContext(AuthContext);


 useEffect(() => {

  const getToken = async()=>{
      try {
          const tokenData = await getStreamToken()
         setToken(tokenData?.data?.token)
         console.log("td",tokenData?.data?.token);
         console.log("STREAM_API_KEY in frontend:", STREAM_API_KEY);

         
      } catch (error) {
          console.error("error in getting token from stream",error)
      }
  }
  getToken()

 }, [])


 useEffect(() => {
   
  const initChat  = async()=>{
if(!token || !currentUser)return;

try {
  console.log("initializing stream chat client...");

  const client = StreamChat.getInstance(STREAM_API_KEY);

  await client.connectUser({
    id:currentUser._id,
    name:currentUser.username,
    image:currentUser.avatar
  },token)

  const channelId = [currentUser._id,targetUserId].sort().join("-");
   const currChannel = client.channel("messaging", channelId, {
          members: [currentUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
  
} catch (error) {
   console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
}finally {
        setLoading(false);
      }
  }

         initChat();
 }, [token, currentUser, targetUserId])
 
 
  if (loading || !chatClient || !channel) return <ChatLoader />;


  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};
export default ChatPage;