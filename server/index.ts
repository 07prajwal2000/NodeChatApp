import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { CreateChannelService } from "./factory/serviceFactory";
import WebsocketHandler from "./WebsocketHandler";

const app = express();
const server = createServer(app);
const ws = new Server(server, {
  cors: {
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  },
});
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
const wsHandler = new WebsocketHandler(ws, CreateChannelService());
wsHandler.Initialize();

app.get("/test", (req: Request, res: Response) => {
  res.json({hello: 'world'});
});
server.listen(3000, () => console.log("listening on http://localhost:3000"));