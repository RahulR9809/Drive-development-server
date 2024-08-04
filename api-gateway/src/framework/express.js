import express from "express";
import { configDotenv } from "dotenv";
import cors from 'cors'
import { authRouter } from "../interfaces/routes/user/userRouter.js";

configDotenv();

export const createServer = () => {
  const app = express();
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use("/api/auth",authRouter)
  return app;
};
