import { FC } from "react";

interface MessageBoxPropTypes {
	message: string;
	userId: string;
	fromMe: boolean;
	time: number;
}

const MessageBox: FC<MessageBoxPropTypes> = ({
	message,
	fromMe,
	time,
	userId,
}) => {
	return (
		<div
			className={`${
				fromMe ? "ml-auto" : ""
			} bg-neutral-700 p-2 relative min-w-[30%] w-fit rounded-sm z-10 max-w-[90%]`}
		>
			<p className="text-xs text-neutral-300">
				From: {fromMe ? "You" : userId}
			</p>
			<span
				className={`w-3 h-3 absolute bg-neutral-700 bottom-[2px] rounded-sm ${
					fromMe ? "-right-1" : "-left-1"
				} z-0 rotate-45`}
			/>
			<div>{message}</div>
			<p className="text-xs opacity-70 float-right">
				{new Date(time).toLocaleString()}
			</p>
		</div>
	);
};

export default MessageBox;
