import { app } from "./app.js";

const PORT = process.env.PORT



const startServer = ()=>{
    try {
        app.listen(PORT,()=>console.log('trip server started at PORT 3003'))
    } catch (error) {
        console.error(error);
    }
}
startServer()