import { Server } from "socket.io";
const driverAndSocketId = new Map();
const userAndSocketId = new Map();
let io;

export const socketConnection = async (httpServer) => {
  try {
    io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:3001", "http://localhost:3003",'*'],
                // origin: '*',

        credentials:true
      },
    });
    io.on("connection", (socket) => {
      console.log('connected to the soccket server successFully');

      
      socket.on("driver-connected", (driverId) => {
        driverAndSocketId.set(driverId, socket.id);
        console.log("driver-socket-connected",driverId,socket.id);
        
      });
      socket.on("user-connected", (userId) => {
        console.log("user-connected success to trip-srv",userId, socket.id);
        userAndSocketId.set(userId, socket.id);
        
      });
      
      socket.on("location-update", (data) => {
        const userIdToString = data?.userId.toString();
        socket.to(userAndSocketId.get(userIdToString)).emit("live-location", data);
      });

        socket.on('ride-started',(data)=>{
        const userId = data?.userId
        socket.to(userAndSocketId.get(userId)).emit('ride-start',data)
      })

      socket.on('ride-complete',(data)=>{
        const userId = data?.userId
        socket.to(userAndSocketId.get(userId)).emit('ride-complete',data)
      })

    });
  } catch (error) {
    console.error(error);
  }
};

export const notifyDriver = (event, notification, driverId) => {
  const driverIdToString = driverId.toString();
  io.to(driverAndSocketId.get(driverIdToString)).emit(event, notification);
  
  return;
};

export const userNotify = (event, data, userId) => {

  
  const usereIdtoString = userId.toString();
  


  io.to(userAndSocketId.get(usereIdtoString)).emit(event, data);
  return;
};
