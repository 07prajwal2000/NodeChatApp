import { FC } from "react";
import MessageBox from "./messageBox";
import useGlobalStore, { ChannelMessageType } from "../store/globalStore";

interface MessagePanelPropTypes {
	messages: ChannelMessageType[];
}

const MessagePanel: FC<MessagePanelPropTypes> = (props) => {
	const id = useGlobalStore().userId;
	return (
		<div className="p-4 flex flex-col gap-2">
			{props.messages.map((message) => (
				<MessageBox
					userId={message.userId!}
					key={message.time}
          fromMe={message.userId == id}
          message={message.message}
          time={message.time!}
				/>
			))}
		</div>
	);
};

export default MessagePanel;
