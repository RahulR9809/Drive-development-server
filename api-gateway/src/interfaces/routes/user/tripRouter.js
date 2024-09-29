import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { TRIP_SERVICE } from "../../../config/constants/proxyTarget.js";

const tripRouter = express.Router();

// proxing the request from gateway to trip-service
tripRouter.use(createProxyMiddleware({
    target:TRIP_SERVICE,
    // changeOrigin: true,
  })
);

export default tripRouter ;
