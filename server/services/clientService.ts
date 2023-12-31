import { ServerSentEvents } from "../types/globalTypes";
import { MessageType } from "../types/messageTypes";
import { ClientSocket } from "../WebsocketHandler";
export interface IClientService {
	RemoveClient(client: ClientSocket): boolean;
	AddClient(client: ClientSocket): boolean;
	BroadcastMessage(message: MessageType, connections: ClientSocket[]): number;
	GetClient(id: string): ClientSocket | null;
	SendToClient(id: string, message: MessageType): boolean;
	IsConnected(id: string): boolean;
}

type ConnectedClientsType = { [id: string]: ClientSocket };

export default class ClientService implements IClientService {
	private connectedClients: ConnectedClientsType = {};

	public AddClient(client: ClientSocket): boolean {
		if (client.id in this.connectedClients) {
			return false;
		}
		this.connectedClients[client.id] = client;
		return true;
	}

	public RemoveClient(client: ClientSocket): boolean {
		const contains = client.id in this.connectedClients;
		delete this.connectedClients[client.id];
		return contains;
	}

	public BroadcastMessage(message: MessageType, connections: ClientSocket[]): number {
		let sendCount = 0;

		connections.forEach((conn) => {
			if (conn.id == message?.userId) return;
			if (!this.SendToClient(conn.id, message)) {
				return;
			}
			sendCount++;
		});

		return sendCount;
	}

	public GetClient(id: string): ClientSocket | null {
		if (id in this.connectedClients) {
			return this.connectedClients[id];
		}
		return null;
	}

	public SendToClient(id: string, message: MessageType): boolean {
		if (!(id in this.connectedClients)) {
			return false;
		}
		const client = this.connectedClients[id];
		if (!client.connected) {
			this.RemoveClient(client);
			return false;
		}
		client.emit(ServerSentEvents.CHANNEL_SEND_MESSAGE, message);
		return true;
	}

	public IsConnected(id: string): boolean {
		if (id in this.connectedClients) {
			return this.connectedClients[id].connected;
		}
		return false;
	}
}
