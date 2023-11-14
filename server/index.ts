import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import WebsocketHandler from "./WebsocketHandler";
import { CreateChannelService } from "./factory/serviceFactory";
import { randomID } from "./utils/randomGen";

const app = express();
const server = createServer(app);
const ws = new Server(server);

const wsHandler = new WebsocketHandler(ws, CreateChannelService());
wsHandler.Initialize();

app.listen(3000, () => console.log("listening on http://localhost:3000"));