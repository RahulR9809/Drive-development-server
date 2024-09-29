import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { AUTH_SERVICE } from "../../../config/constants/proxyTarget.js";

const authRouter = express.Router();

// proxing the request from gateway to auth-service
authRouter.use(createProxyMiddleware({
    target: AUTH_SERVICE,
    // changeOrigin: true,
  })
);

export default authRouter ;
