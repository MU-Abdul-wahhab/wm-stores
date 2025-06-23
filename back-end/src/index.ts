import { error } from "node:console";
import { Server } from "./server";
import { Utils } from "./utils/Utils";

let port = 3000;
let server = new Server().app;

server.listen(port, () => {
    console.log(`Server Listening On Port Number :- ${port}`);
    console.log(Utils.time());
});

