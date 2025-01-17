// import { Server } from "socket.io";
// const driverAndSocketId = new Map();
// const userAndSocketId = new Map();
// let io;

// export const socketConnection = async (httpServer) => {
//   try {
//     io = new Server(httpServer, {
//       cors: {
//         origin: ["http://localhost:3001", "http://localhost:3003",'*'],
//                 // origin: '*',

//         credentials:true
//       },
//     });
//     io.on("connection", (socket) => {
//       console.log('connected to the soccket server successFully');

      
//       socket.on("driver-connected", (driverId) => {
//         driverAndSocketId.set(driverId, socket.id);
//         console.log("driver-socket-connected",driverId,socket.id);
        
//       });
//       socket.on("user-connected", (userId) => {
//         console.log("user-connected success to trip-srv",userId, socket.id);
//         userAndSocketId.set(userId, socket.id);
        
//       });
      
//       socket.on("location-update", (data) => {
//         const userIdToString = data?.userId.toString();
//         socket.to(userAndSocketId.get(userIdToString)).emit("live-location", data);
//       });

//         socket.on('ride-started',(data)=>{
//         const userId = data?.userId
//         console.log("ride-starte  success to trip-srv",userId, socket.id);

//         socket.to(userAndSocketId.get(userId)).emit('ride-start',data)
//       })

//       socket.on('ride-complete',(data)=>{
//         const userId = data?.userId
//         socket.to(userAndSocketId.get(userId)).emit('ride-complete',data)
//       })

//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const notifyDriver = (event, notification, driverId) => {
//   const driverIdToString = driverId.toString();
//   console.log('event data',event, notification, driverId)
//   io.to(driverAndSocketId.get(driverIdToString)).emit(event, notification);
  
//   return;
// };

// export const userNotify = (event, data, userId) => {
//   const usereIdtoString = userId.toString();
//   console.log(usereIdtoString);
//   io.to(userAndSocketId.get(usereIdtoString)).emit(event, data);
//   return;
// };



import { Server } from "socket.io";
// const driverAndSocketId = new Map();
// const userAndSocketId = new Map();
let io;

export const socketConnection = async (httpServer) => {
  try {
    io = new Server(httpServer, {
      path:"/socket.io/trip",
      cors: {
                origin: ["http://localhost:3001", "http://localhost:3003",'*'],
                        // origin: '*',
        
                credentials:true
              },
    });
    io.on("connection", (socket) => {
      socket.on("driver-connected", (driverId) => {
        socket.join(driverId)      
        console.log(' driver connected to server')  
      });
      socket.on("user-connected", (userId) => {
        socket.join(userId)
        console.log(' user connected to server')  

      });
      socket.on("location-update", (data) => {
        const userIdToString = data?.userId.toString();
        socket.to(userIdToString).emit("live-location", data);
      });
        socket.on('nearbyPickup',(data)=>{
        socket.to(data?.userId).emit('nearbyRide',data)
      })

      socket.on('live-update',(data)=>{
        socket.to(data?.recieverId).emit('tripLive-Updates',data)
      })

      socket.on('start-ride',(data)=>{
        socket.to(data.userId).emit('ride-start','started')
      })

      socket.on('ride-complete',(data)=>{
        const userId = data?.userId                        
        socket.to(userId.toString()).emit('ride-complete',data)
      })

    });
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const notifyDriver = (event, notification, driverId) => {
    const driverIdToString = driverId.toString();
    io.to(driverIdToString).emit(event,notification) 
    return;
};

export const userNotify = (event, data, userId) => {
  io.to(userId.toString()).emit(event,data)
  return;
};

export const emitEvent = (event,data,userId)=>{
  console.log('ejjjj');
  
  io.to(userId.toString()).emit(event,data)
  return
}