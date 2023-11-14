import ChannelService, { IChannelService } from "../services/channelService";
import ClientService, { IClientService } from "../services/clientService";

export function CreateMessageService(): IClientService {
  return new ClientService();
}

export function CreateChannelService(): IChannelService {
  const messageService = CreateMessageService();
  return new ChannelService(messageService);
}