 import { createServer } from "./framework/express.js";
import { dbConnect } from "./config/dbConnect.js";
import { configDotenv } from "dotenv";
import { KafkaClient } from "./events/KafkaClient.js";
import { TOPICS } from "./events/config.js";

console.log('hello'); 


configDotenv()
 

const app = createServer();
dbConnect();
const kafka = new KafkaClient()
kafka.consumeMessages(TOPICS)


export {app}
