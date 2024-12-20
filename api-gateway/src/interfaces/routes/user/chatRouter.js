import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { CHAT_SERVICE } from "../../../config/constants/proxyTarget.js";

const chatRouter = express.Router();

// proxing the request from gateway to chat-service
chatRouter.use(createProxyMiddleware({
    target: 'http://localhost:3004/chat',
    // changeOrigin: true,
  })
);

export default chatRouter;