import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IChannelService } from "./services/channelService";
import { ServerSentEvents, MessageTypes, ClientRequest, clientRequestSchema } from "./types/globalTypes";
import { CreateChannelDto, GetMessagesFromChannelDto, JoinChannelDto, SendMessageToChannelDto, createChannelSchema, getMessagesFromChannelSchema, joinChannelSchema, sendMessageToChannelSchema } from "./types/messageTypes";

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
      const data = this.OnConnection(client);
      client.emit(ServerSentEvents.CONNECTED, data);

      client.on('disconnect', () => {
        this.channelService.clientService.RemoveClient(client);
      });
      
      client.on('message', (data: ClientRequest) => {
        if (!clientRequestSchema.safeParse(data).success) {
          client.emit(ServerSentEvents.DATA_ERROR, {
            message: 'Invalid response'
          });
        }
        this.MapEvents(data, client);
      })
      
    });
  }

  private MapEvents(data: ClientRequest, client: ClientSocket) {
    switch (data.messageType) {
      case MessageTypes.CHANNEL_CREATE:
        this.createChannel(data.data, client);
        break;
      case MessageTypes.CHANNEL_JOIN:
        this.joinChannel(data.data, client);
        break;

      case MessageTypes.CHANNEL_MESSAGE_SEND:
        this.sendMessageToChannel(data.data, client);
        break;

      case MessageTypes.CHANNEL_MESSAGE_GET:
        this.getChannelMessages(data.data, client);
    }
  }

  private getChannelMessages(data: any, client: ClientSocket) {
    const dto = data as GetMessagesFromChannelDto;
    if (!getMessagesFromChannelSchema.safeParse(dto).success) {
      client.emit(ServerSentEvents.DATA_ERROR, {
        message: 'Invalid message'
      });
      return;
    }
    const msgs = this.channelService.GetMessagesFromChannel(dto.channelId);
    client.emit(ServerSentEvents.CHANNEL_MESSAGES, {
      messages: msgs,
      channelId: dto.channelId
    });
  }
  
  private sendMessageToChannel(data: any, client: ClientSocket) {
    const dto = data as SendMessageToChannelDto;
    if (!sendMessageToChannelSchema.safeParse(dto).success) {
      client.emit(ServerSentEvents.DATA_ERROR, {
        message: 'Invalid message'
      });
      return;
    }
    console.log("Sent: ", this.channelService.SendMessageToChannel(dto.channelId, dto.message, client.id));
  }
  
  private joinChannel(data: any, client: ClientSocket) {
    const dto = data as JoinChannelDto;
    if (!joinChannelSchema.safeParse(dto).success) {
      client.emit(ServerSentEvents.DATA_ERROR, {
        message: 'Invalid channel id'
      });
      return;
    }
    const joined = this.channelService.JoinChannel(dto.channelId, client);
    const channelDetails = this.channelService.GetChannelDetails(dto.channelId);
    console.log(channelDetails);
    client.emit(joined ? ServerSentEvents.CHANNEL_JOINED : ServerSentEvents.CHANNEL_JOIN_FAIL, {
      message: joined ? 'Joined' : 'Unable to join',
      channelDetails,
      channelId: dto.channelId
    });
  }

  private createChannel(data: any, client: ClientSocket) {
    const dto = data as CreateChannelDto;
    if (!createChannelSchema.safeParse(dto).success) {
      client.emit(ServerSentEvents.DATA_ERROR, {
        message: 'Invalid data to create channel'
      });
      return;
    }
    const channelId = this.channelService.CreateChannel(dto.title, dto.description, client);
    client.emit(ServerSentEvents.CHANNEL_CREATED, {
      channelId,
      ...dto
    });
  }

  private OnConnection(client: ClientSocket) {
    console.log('Client connected. ID: ' + client.id); 
    const done = this.channelService.clientService.AddClient(client);
    const resp = {
      data: done,
      messageType: MessageTypes.CONNECTION_FAIL
    };
    if (!done) {
      client.emit(ServerSentEvents.SERVER_ERROR, resp);
    }
    resp.messageType = MessageTypes.CONNECTION_OK;
    return resp;
  }
}