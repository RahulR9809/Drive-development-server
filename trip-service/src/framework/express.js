import express from "express";
import cookieParser from "cookie-parser";


const createServer = () => {
  const app = express();
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

//   app.use(ErrorHandling.errorHandler);
  return app;
};

export { createServer };