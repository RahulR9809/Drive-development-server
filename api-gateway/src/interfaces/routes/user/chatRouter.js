import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { CHAT_SERVICE } from "../../../config/constants/proxyTarget.js";

const chatRouter = express.Router();

// proxing the request from gateway to chat-service
chatRouter.use(createProxyMiddleware({
    target: CHAT_SERVICE,
    // changeOrigin: true,
  })
);

export default chatRouter;