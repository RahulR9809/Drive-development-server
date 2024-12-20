import { app } from "./app.js";

const PORT = process.env.PORT



const startServer = ()=>{
    try {
        app.listen(PORT,()=>console.log('chat server started at PORT 3004'))
    } catch (error) {
        console.error(error);
    }
}
startServer()