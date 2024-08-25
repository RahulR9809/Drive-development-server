import express from "express";
import http from 'http'
import cookieParser from "cookie-parser";
// import session from "express-session";
// import userRouter from '../interface/routes/user/userRoute.js'
// import driverRouter from "../interface/routes/driver/driverRoute.js";



const createServer = () => {
  const app = express();
  const httpServer = http.createServer(app)
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use(session({
  //   secret:process.env.SESSION_SECRET,
  //   resave:false,
  //   saveUninitialized:false,
  // }))
  // app.use('/trip/users',userRouter)
  // app.use('/trip/driver',driverRouter)

//   app.use(ErrorHandling.errorHandler);
  return httpServer;
};

export { createServer };