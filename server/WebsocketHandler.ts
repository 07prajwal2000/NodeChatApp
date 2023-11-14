import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IChannelService } from "./services/channelService";

export interface ClientSocket extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>{};

export default class WebsocketHandler {
  private wsServer: Server;
  private channelService: IChannelService;
  
  constructor(server: Server, channelService: IChannelService) {
    this.wsServer = server;
    this.channelService = channelService;
  }

  public Initialize() {
    this.wsServer.on('connection', this.OnConnection);
  }

  private OnConnection(client: ClientSocket) {
    const done = this.channelService.clientService.AddClient(client);
    
  }
}