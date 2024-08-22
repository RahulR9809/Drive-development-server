import { Server } from "socket.io";
const driverAndSocketId = new Map();
const userAndSocketId = new Map();
let io;

export const socketConnection = async (httpServer) => {
  try {
    io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:3001", "http://localhost:3000"],
      },
    });
    io.on("connection", (socket) => {
      socket.on("driver-connected", (driverId) => {
        driverAndSocketId.set(driverId, socket.id);
      });
      socket.on("user-connected", (userId) => {
        console.log("user-connected", userId,socket.id);
        userAndSocketId.set(userId, socket.id);
      });

      socket.on("location-update", (data) => {
        
        const userIdToString = data?.userId.toString();
        console.log('socketDetails',userAndSocketId.get(userIdToString),data);
        
          io.to(userAndSocketId.get(userIdToString)).emit("live-location", data);
          io.to(userAndSocketId.get(userIdToString)).emit("dummy-event", data);
        
       

      });
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
console.log('userandSocket',userAndSocketId.get(usereIdtoString),event,data);
  io.to(userAndSocketId.get(usereIdtoString)).emit(event, data);
  return;
};
