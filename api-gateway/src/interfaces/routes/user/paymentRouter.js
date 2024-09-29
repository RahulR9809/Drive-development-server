import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { PAYMENT_SERVICE } from "../../../config/constants/proxyTarget.js";

const paymentRouter = express.Router();

// proxing the request from gateway to payment-service
paymentRouter.use(createProxyMiddleware({
    target:PAYMENT_SERVICE,
    // changeOrigin: true,
  })
);

export default paymentRouter;