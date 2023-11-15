import { Socket, io } from "socket.io-client";
import {
	ClientRequest,
	MessageTypes,
	ServerSentEvents,
} from "./types/globalTypes";
import { CreateChannelDto, JoinChannelDto, MessageType, SendMessageToChannelDto } from "./types/messageTypes";

const URL = import.meta.env.VITE_SERVER_DOMAIN || "http://localhost:3000";

let websocketClient: Socket<any, any> = io(URL);

export default function ConnectToServer() {
	websocketClient = websocketClient.connect();
}

export function OnConnected(
	func: (data: ClientRequest, userId: string) => void
) {
	websocketClient.on(ServerSentEvents.CONNECTED, (d: any) => {
		func(d, websocketClient.id);
	});
}

export function OnDataErrorFromServer(func: (msg: string) => void) {
	websocketClient.on(ServerSentEvents.DATA_ERROR, (data: any) =>
		func(data.message)
	);
}

export function OnDChannelJoinFailed(func: (message: string) => void) {
	websocketClient.on(ServerSentEvents.CHANNEL_JOIN_FAIL, func);
}

export function CreateChannel(data: CreateChannelDto) {
	const request: ClientRequest = {
		data,
		messageType: MessageTypes.CHANNEL_CREATE,
	};
	websocketClient.send(request);
}

export function JoinChannel(dto: JoinChannelDto) {
	const request: ClientRequest = {
		data: dto,
		messageType: MessageTypes.CHANNEL_JOIN,
	};
	websocketClient.send(request);
}

export function SendMessageToChannel(dto: SendMessageToChannelDto) {
	const request: ClientRequest = {
		data: dto,
		messageType: MessageTypes.CHANNEL_MESSAGE_SEND,
	};
	websocketClient.send(request);
}

export function OnChannelCreated(
	func: (data: {
		channelId: string;
		title: string;
		description: string;
	}) => void
) {
	websocketClient.on(ServerSentEvents.CHANNEL_CREATED, func);
}

export function OnChannelJoined(
	func: (data: {
		message: string;
		channelDetails?: {
			title: string;
			description: string;
			messages: MessageType[];
		};
		channelId: string;
	}) => void
) {
	websocketClient.on(ServerSentEvents.CHANNEL_JOINED, func);
}

export function OnMessageRecieved(func: (data: MessageType) => void) {
	websocketClient.on(ServerSentEvents.CHANNEL_SEND_MESSAGE, func);
}

export function OnDisconnected(func: () => void) {
	websocketClient.on("disconnect", func);
}

export function DisconnectFromServer() {
	websocketClient.disconnect();
}
