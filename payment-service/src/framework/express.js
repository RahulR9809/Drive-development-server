import express from "express";
// import http from 'http'
import cookieParser from "cookie-parser";
import paymentRouter from "../interface/routes/paymentRoute.js";




const createServer = () => {
  const app = express();
  
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // app.use('/payment/user/',paymentRouter)
  app.use('/payment',(req,res,next)=>{console.log("hello");next()
  },paymentRouter)

  return app
};

export { createServer };