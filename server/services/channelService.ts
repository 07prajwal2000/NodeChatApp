import { ClientSocket } from "../WebsocketHandler";
import { CHANNEL_ID_SIZE, MessageType } from "../types/messageTypes";
import { randomID } from "../utils/randomGen";
import { IClientService } from "./clientService";

export interface IChannelService {
	CreateChannel(title: string, desc: string, owner: ClientSocket): void;
	JoinChannel(channelId: string, client: ClientSocket): boolean;
	SendMessageToChannel(
		channelId: string,
		message: any,
		userId: string
	): boolean;
	GetMessagesFromChannel(channelId: string): MessageType[];
	RemoveClientFromChannel(channelId: string, userId: string): boolean;
	GenerateChannelId(): string;
  clientService: IClientService;
}

type ChannelType = {
	[id: string]: {
		title: string;
		description: string;
		connections: ClientSocket[];
		messages: MessageType[];
	};
};

export default class ChannelService implements IChannelService {
	private channels: ChannelType = {};
	public clientService: IClientService;

	constructor(clientService: IClientService) {
		this.clientService = clientService;
	}

	public CreateChannel(title: string, desc: string, owner: ClientSocket) {
		const channelId = this.GenerateChannelId();

		this.channels[channelId] = {
			title: title,
			description: desc,
			connections: [owner],
			messages: [],
		};
	}

	public JoinChannel(channelId: string, client: ClientSocket): boolean {
		const channel = this.channels[channelId];
		if (!channel || channel.connections.includes(client)) return false;

		channel.connections.push(client);
		return true;
	}

	public SendMessageToChannel(
		channelId: string,
		message: any,
		userId: string
	): boolean {
		const channel = this.channels[channelId];
		if (!channel) return false;
		this.clientService.BroadcastMessage(message, channel.connections);
		channel.messages.push({
			message: message,
			userId: userId,
			channelId: channelId,
			time: Date.now(),
		});
		if (channel.messages.length > 100) {
			channel.messages.pop();
		}
		return true;
	}

	public GetMessagesFromChannel(channelId: string): MessageType[] {
		const channel = this.channels[channelId];
		if (!channel) return [];
		return channel.messages;
	}

	public RemoveClientFromChannel(channelId: string, userId: string): boolean {
		const channel = this.channels[channelId];
		if (!channel) return false;
		const beforeSize = channel.connections.length;
		channel.connections = channel.connections.filter((x) => x.id == userId);
		const afterSize = channel.connections.length;
		return beforeSize != afterSize;
	}

	public GenerateChannelId(): string {
		return randomID(CHANNEL_ID_SIZE);
	}
}
