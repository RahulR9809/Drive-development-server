import  app  from "./app.js";

const PORT = process.env.PORT

const startServer = ()=>{
    try {
        app.listen(PORT,()=>console.log('Auth server started at PORT 3002'))
    } catch (error) {
        console.error(error);
    }
}
startServer()