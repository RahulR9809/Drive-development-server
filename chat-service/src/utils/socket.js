
import {Server} from 'socket.io'

let io
export const socketConnection = async(httpServer)=>{
  try {
    io = new Server(httpServer, {
             path:'/socket.io/chat',
             cors: {
              origin: ["http://localhost:3001", "http://localhost:3004",'*'],
             },
           });
    io.on('connection',(socket)=>{
      console.log('socker server connected');
    socket.on('driver-chat-connect',(tripId)=>{
      socket.join(tripId)
      console.log(' driver connecected room1',tripId);
    })
    socket.on('user-chat-connect',(tripId)=>{
      socket.join(tripId)
      console.log(' user connected room1',tripId)
    })
    })       
    
  } catch (error) {
    console.error(error);
    
  }
}

export const sendMessage = (event,data,roomId)=>{
  console.log('roomId',roomId);
  console.log('inside socketsdsghvvb',event ,data);
io.to(roomId).emit(event,data)
return
}