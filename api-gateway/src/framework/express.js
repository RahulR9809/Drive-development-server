import express from "express";
import { configDotenv } from "dotenv";
import cors from 'cors'
import { authRouter } from "../interfaces/routes/user/userRouter.js";
import { tripRouter } from "../interfaces/routes/user/tripRouter.js";
import { chatRouter } from "../interfaces/routes/user/chatRouter.js";

configDotenv();

export const createServer = () => {
  const app = express();
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use("/api/auth",authRouter)
  app.use('/api/trip',tripRouter)
  app.use('/api/chat',chatRouter)

  return app;
};
