 import { createServer } from "./framework/express.js";
import { dbConnect } from "./config/dbConnect.js";
import { configDotenv } from "dotenv";
import { KafkaClient } from "./events/KafkaClient.js";

configDotenv();

const app = createServer();

dbConnect();

export {app}
