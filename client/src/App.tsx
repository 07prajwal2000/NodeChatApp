import { useEffect, createContext, useContext } from "react";
import ChatWindow from "./components/chatWindow";
import ConnectToServer, {
	CreateChannel,
	DisconnectFromServer,
	JoinChannel,
	OnChannelCreated,
	OnChannelJoined,
	OnConnected,
	OnMessageRecieved,
  SendMessageToChannel,
} from "./websocketHandler";
import useGlobalStore from "./store/globalStore";
import { CreateChannelDto, MessageType } from "./types/messageTypes";

const WebsocketContext = createContext<
	| {
			sendMessageToChannel: (channelId: string, msg: string) => void;
			CreateChannel: (data: CreateChannelDto) => void;
			JoinChannel: (channelId: string) => void;
	  }
	| undefined
>(undefined);

export const useWebsocketContext = () => useContext(WebsocketContext);

const App = () => {
	const { setUserId, addMessage, userId, addChannel } = useGlobalStore();

	useEffect(() => {
		ConnectToServer();
		registerEvents();
		return DisconnectFromServer;
	}, []);

	function registerEvents() {
		OnConnected((data, id) => {
			console.log(data);
			setUserId(id);
		});
		OnMessageRecieved(OnMessageRecievedFromServer);
		OnChannelCreated(HandleOnChannelCreated);
		OnChannelJoined(HandleChannelJoined);
	}

	function HandleChannelJoined(data: {
		message: string;
		channelDetails?: {
			title: string;
			description: string;
			messages: MessageType[];
		};
    channelId: string;
	}) {
		if (!data.channelDetails) {
			alert(data.message);
			return;
		}
		addChannel(
			data.channelDetails.title,
			data.channelDetails.description,
			data.channelId,
			data.channelDetails.messages
		);
	}

	function OnMessageRecievedFromServer(data: MessageType) {
		addMessage(data);
	}

	function HandleOnChannelCreated(data: {
		channelId: string;
		title: string;
		description: string;
	}) {
		addChannel(data.title, data.description, data.channelId);
	}

	function sendMessageToChannel(channelId: string, msg: string) {
    SendMessageToChannel({
      channelId,
      message: msg
    });
		addMessage({
			channelId,
			message: msg,
			time: Date.now(),
			userId,
		});
	}

	function createMessageChannel(data: CreateChannelDto) {
		// Do validation
		CreateChannel(data);
	}

	return (
		<div className="bg-neutral-800">
			<WebsocketContext.Provider
				value={{
					sendMessageToChannel,
					CreateChannel: createMessageChannel,
					JoinChannel(channelId) {
						JoinChannel({ channelId });
					},
				}}
			>
				<ChatWindow />
			</WebsocketContext.Provider>
		</div>
	);
};

export default App;
