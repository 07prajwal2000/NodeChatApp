import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IChannelService } from "./services/channelService";
import { MessageTypes, Response } from "./types/globalTypes";

export interface ClientSocket extends Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>{};

export default class WebsocketHandler {
  private wsServer: Server;
  private channelService: IChannelService;
  
  constructor(server: Server, channelService: IChannelService) {
    this.wsServer = server;
    this.channelService = channelService;
  }

  public Initialize() {
    this.wsServer.on('connection', client => {
      this.OnConnection(client);

      client.on('disconnect', () => {
        this.channelService.clientService.RemoveClient(client);
      });
      
    });
  }

  private OnConnection(client: ClientSocket) {
    const done = this.channelService.clientService.AddClient(client);
    const resp: Response<boolean> = {
      data: done,
      success: done,
      messageType: MessageTypes.CONNECTION_FAIL
    };
    if (!done) {
      client.send(resp);
    }
    resp.messageType = MessageTypes.CONNECTION_OK;
  }
}