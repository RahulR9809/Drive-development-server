import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import  authRouter  from "../interfaces/routes/user/userRouter.js";
import  tripRouter  from "../interfaces/routes/user/tripRouter.js";
import  chatRouter  from "../interfaces/routes/user/chatRouter.js";
import  paymentRouter  from "../interfaces/routes/user/paymentRouter.js";
import { CORS_ORIGIN } from "../config/constants/proxyTarget.js";
import morgan from "morgan"
configDotenv();

//configuring the Express Server
export const createServer = () => {
  const app = express();
  app.use(
    cors({
      origin: CORS_ORIGIN, //origin from where request is hitting the gateway
      credentials: true,
    })
  );
  app.use(morgan("dev"))
  app.use("/api/auth", authRouter);
  app.use("/api/trip", tripRouter);
  app.use("/api/chat" ,chatRouter);
  app.use("/api/payment",(req,res,next)=>{console.log('chat router');next()}, paymentRouter);
  return app;
};
