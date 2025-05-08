import { Server } from "./server";

let port = 3000;
let server = new Server().app;

server.listen(port, ()=>{
    console.log(`Server Listening On Port Number :- ${port}`);
})