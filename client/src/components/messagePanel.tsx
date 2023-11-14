import { FC } from "react";
import MessageBox from "./messageBox";

interface MessagePanelPropTypes {
	messages: { message: string; fromMe: boolean; time: number }[];
}

const MessagePanel: FC<MessagePanelPropTypes> = (props) => {
	return (
		<div className="p-4 flex flex-col gap-2">
			{props.messages.map((message) => (
				<MessageBox
					key={message.time}
          fromMe={message.fromMe}
          message={message.message}
          time={message.time}
				/>
			))}
		</div>
	);
};

export default MessagePanel;
