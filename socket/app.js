import {Server, Socket} from 'socket.io'

const io = new Server({
    cors:{
        origin:"http://localhost:5173"
    }
})

 let onlineUsers = [];

const addUser = (userId,socketId)=>{
    const userExists = onlineUsers.find((user)=>user.userId === userId);
    if(!userExists){
        onlineUsers.push({userId,socketId});
    }}

 const removeUser = (socketId)=>{
        onlineUsers= onlineUsers.filter((user)=>user.socketId !== socketId)
    }

    const getUser = (userId)=>{
    return onlineUsers.find(user=>user.userId === userId)
    }


io.on("connection",(socket)=>{
   console.log(socket.id);
   
   socket.on("newUser",(userId)=>{
    addUser(userId,socket.id)
    console.log(onlineUsers);
    
  })

 socket.on("disconnect",()=>{
removeUser(socket.id)
        })

 socket.on("sendMessage",({receiverId,data})=>{
console.log(receiverId,data);

const receiver = getUser(receiverId);
if (receiver) {
  io.to(receiver.socketId).emit("getMessage", data);
}


        })

 
   
        
    
})

io.listen("4000")